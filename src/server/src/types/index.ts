
import express from "express";
import * as session from "express-session"
import { } from '../lib/dynamodb/user'
//  ./lib/dynamodb/user'
declare global {
    namespace Express {
      interface Request {
        sessionID?: string
        // user?:
      }
    }
  }