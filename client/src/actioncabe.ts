import {WSSUrl} from "./data/serverUrl";
import {createConsumer} from "@rails/actioncable";

const actionCableUrl = WSSUrl + '/cable';

export const consumer = createConsumer(actionCableUrl);