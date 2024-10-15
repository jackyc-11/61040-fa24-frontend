import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotFoundError } from "./errors";

export interface MessageDoc extends BaseDoc {
  sender: ObjectId;
  recipient: ObjectId;
  content: string;
}

/**
 * concept: Texting [User, Message]
 */
export default class TextingConcept {
  public readonly messages: DocCollection<MessageDoc>;

  constructor(collectionName: string) {
    this.messages = new DocCollection<MessageDoc>(collectionName);
  }

  // Sends a message from one user to another
  async sendMessage(sender: ObjectId, recipient: ObjectId, content: string) {
    // Ensure content is not empty
    if (!content) {
      throw new BadValuesError("Message content cannot be empty");
    }

    const _id = await this.messages.createOne({ sender, recipient, content });

    return { msg: "Message sent successfully!", message: await this.messages.readOne({ _id }) };
  }

  // Retrieves a specific message by its ObjectId
  async getMessageById(_id: ObjectId) {
    const message = await this.messages.readOne({ _id });
    if (!message) {
      throw new NotFoundError("Message not found");
    }
    return message;
  }

  // Retrieves all messages between two users, sorted by dateCreated
  async getMessagesBetweenUsers(user1: ObjectId, user2: ObjectId) {
    const messages = await this.messages.readMany(
      {
        $or: [
          { sender: user1, recipient: user2 },
          { sender: user2, recipient: user1 },
        ],
      },
      { sort: { dateCreated: 1 } },
    );

    return messages;
  }

  // Deletes a message by its ID
  async deleteMessage(_id: ObjectId) {
    await this.messages.deleteOne({ _id });
    return { msg: "Message deleted successfully!" };
  }
}
