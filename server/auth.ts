import type { Express } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import memorystore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";
import { validateUser, getUserById } from "./services/auth.service";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      password: string;
    }
  }
}

export function setupAuth(app: Express) {
  const MemoryStore = memorystore(session);
  const PgStore = connectPgSimple(session);
  const usePgStore = Boolean(process.env.DATABASE_URL);

  const sessionStore = usePgStore
    ? new PgStore({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl:
            process.env.NODE_ENV === "production"
              ? { rejectUnauthorized: false }
              : undefined,
        }),
        createTableIfMissing: true,
      })
    : new MemoryStore({ checkPeriod: 86400000 });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "dev-session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: sessionStore,
    })
  );

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await validateUser(username, password);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
