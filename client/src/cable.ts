import { createConsumer } from "@rails/actioncable";
import {WSSUrl} from "./data/serverUrl";

const actionCableUrl = WSSUrl + '/cable';

const consumer = createConsumer(actionCableUrl);

export default consumer;