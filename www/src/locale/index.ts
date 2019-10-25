import ru from "./ru";
import en from "./en";
import bg from "./bg";

const messages: {
    [key: string]: Record<string, string>
} = { en, ru, bg };

export default messages;
