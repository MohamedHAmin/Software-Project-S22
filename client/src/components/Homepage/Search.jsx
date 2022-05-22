import React,{useState} from "react";
import "./Styles/Search.css"
import { TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from "react-router-dom";
import SuggestedAccounts from "./SuggestedAccounts";

function Search(props){
    const navigate = useNavigate();
    const [content,setcontent]=useState(""); 
    
    const passnotificationcount=(value)=>{
        props.passnotificationcount(value)
    }

    function enterHandler (event)
    {
        if (event.keyCode == 13) {
            if (document.getElementById("searchboxID").value)
            {
            let searchtext= document.getElementById("searchboxID").value;
            localStorage.setItem("searchKey",searchtext);
            localStorage.setItem("check",1);
            navigate(`/search/${searchtext}`);
            }
        }
    };

    function searchHandler()
    {
        if (document.getElementById("searchboxID").value)
        {
        let searchtext= document.getElementById("searchboxID").value;
        localStorage.setItem("searchKey",searchtext);
        localStorage.setItem("check",1);
        navigate(`/search/${searchtext}`);
        }
    }
    return (
        <React.Fragment>
            <span id="1" className="search" onKeyUp={enterHandler}>
                <TextField value={content} variant="standard" id="searchboxID" className="searchbox" placeholder="Search Larry!" onChange={(e) => setcontent(e.target.value)} 
                //the following lines where to add an icon inside the textfield
                InputProps={{
                    disableUnderline:true, //this line along with variant"standard" where added to remove the border of the textfield
                    endAdornment: (        //border:none didn't work
                        <InputAdornment>
                            <div onClick={searchHandler}>
                            <SearchIcon className="searchIcon"/>
                            </div>
                        </InputAdornment>)
                        }}
                />
            </span>
            {props.viewSuggestedAccounts ? (<SuggestedAccounts passnotificationcount={passnotificationcount} />) : (<></>)}
        </React.Fragment>
    );
}
export default Search;