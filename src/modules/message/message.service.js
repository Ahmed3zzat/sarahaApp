import Message from "../../DB/models/message.model.js";
import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

// 1. Send Message
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, receiver } = req.body;

  const user = await User.findById(receiver);

  if (!user) {
    return next(new Error("Receiver Not Found", { cause: 404 }));
  }

  await Message.create({
    receiver,
    content,
    sender: req._constructedUser._id,
  });

  return res.status(201).json({
    success: true,
    message: "Message Sent Successfully!",
  });
});

// 2. Get Single Message
export const getSingleMessage = asyncHandler(async (req, res, next) => {
  const { _constructedUser } = req;

  const results = await Message.findById(req.params.id).populate([
    { path: "sender", select: "userName -_id" },
    { path: "receiver", select: "userName email -_id" },
  ]);

  if (!results) {
    return next(new Error("Message Not Found", { cause: 404 }));
  }

  const isSender =
    results.sender.toString() === _constructedUser._id.toString();

  const isReceiver =
    results.receiver.toString() === _constructedUser._id.toString();

  // Only the sender or receiver can see the message
  // if (!isSender && !isReceiver) {
  //   return next(new Error("Not Authorized", { cause: 403 }));
  // }

  return res.status(200).json({
    success: true,
    results,
  });
});

// 3. Get All Messages Belonging to Current User
export const getAllMessage = asyncHandler(async (req, res) => {
  const { _constructedUser } = req;

  const results = await Message.find({
    $or: [{ sender: _constructedUser._id }, { receiver: _constructedUser._id }],
  });

  return res.status(200).json({
    success: true,
    count: results.length,
    results,
  });
});

// 4. Update Message
// Only the sender can update the message
export const updateMessage = asyncHandler(async (req, res, next) => {
  const { _constructedUser } = req;
  const { content } = req.body;

  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(new Error("Message Not Found", { cause: 404 }));
  }

  const isSender =
    message.sender.toString() === _constructedUser._id.toString();

  if (!isSender) {
    return next(new Error("Not Authorized", { cause: 403 }));
  }

  message.content = content ?? message.content;
  await message.save();

  return res.status(200).json({
    success: true,
    message: "Message Updated Successfully!",
    results: message,
  });
});

// 5. Delete Message
// Only the sender or receiver can delete the message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { _constructedUser } = req;

  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(new Error("Message Not Found", { cause: 404 }));
  }

  const isSender =
    message.sender.toString() === _constructedUser._id.toString();

  const isReceiver =
    message.receiver.toString() === _constructedUser._id.toString();

  if (!isSender && !isReceiver) {
    return next(new Error("Not Authorized", { cause: 403 }));
  }

  await message.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Message Deleted Successfully!",
  });
});
