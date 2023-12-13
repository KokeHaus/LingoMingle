import Router from "koa-router";
import User from "../models/User.js"; // Ensure User model is compatible with Koa

const router = new Router();

let textqueue = [];
let audioqueue = [];

router.post("/jointextqueue", async (ctx) => {
  const username = ctx.request.body.username;
  if (!textqueue.includes(username)) {
    textqueue.push(username);
  }
  ctx.status = 200;
  ctx.body = {
    message: "Joined text chat queue",
    queueSize: textqueue.length,
  };
});

router.post("/leavetextqueue", (ctx) => {
  const username = ctx.request.body.username;
  textqueue = textqueue.filter((u) => u !== username);
  ctx.status = 200;
  ctx.body = { message: "Left text chat queue" };
});

router.post("/joinaudioqueue", async (ctx) => {
  const username = ctx.request.body.username;
  if (!audioqueue.includes(username)) {
    audioqueue.push(username);
  }
  ctx.status = 200;
  ctx.body = {
    message: "Joined audio chat queue",
    queueSize: audioqueue.length,
  };
});

router.post("/leaveaudioqueue", (ctx) => {
  const username = ctx.request.body.username;
  audioqueue = audioqueue.filter((u) => u !== username);
  ctx.status = 200;
  ctx.body = { message: "Left audio chat queue" };
});

router.get("/text-queue-size", async (ctx) => {
  ctx.status = 200;
  ctx.body = { size: textqueue.length };
});

router.get("/audio-queue-size", async (ctx) => {
  ctx.status = 200;
  ctx.body = { size: audioqueue.length };
});

export default router;
