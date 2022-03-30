import React,{ useState } from 'react';
import EmojiMenu from "emoji-picker-react";

export default function Emoji(){
    const [chosenEmoji, setChosenEmoji] = useState(null);
    
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
    return (
        <div>
            <span>{chosenEmoji.emoji}</span>
          <EmojiMenu onEmojiClick={onEmojiClick} />
        </div>
      );
    };

