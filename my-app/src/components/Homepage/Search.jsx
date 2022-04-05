import React,{useState} from "react";
import "./Styles/Search.css"
import { TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/SearchOutlined';

function Search(){
    const [content,setcontent]=useState("");  
    function enterHandler (event)
    {
        if (event.keyCode == 13) {
            if (content!="")
            {
                setcontent("");
            }
        }
    };
    return (
        <React.Fragment>
            <span id="1" className="search" onKeyUp={enterHandler}>
                <TextField value={content} variant="standard" className="searchbox" placeholder="Search Larry!" onChange={(e) => setcontent(e.target.value)} 
                //the following lines where to add an icon inside the textfield
                InputProps={{
                    disableUnderline:true, //this line along with variant"standard" where added to remove the border of the textfield
                    endAdornment: (        //border:none didn't work
                        <InputAdornment>
                            <SearchIcon className="searchIcon"/>
                        </InputAdornment>)
                        }}
                />
            </span>
        </React.Fragment>
    );
}
export default Search;