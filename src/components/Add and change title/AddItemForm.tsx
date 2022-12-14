import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = React.useState('')
    let [error, setError] = useState<boolean> (false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === "Enter") {
            addItem()
        }
    }


    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Title is required" : "Add title"}
                       variant="outlined"
                       value={title}
                       error = {error}
                       size = "small"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />

            <Button style={ {
                maxWidth:"40px", maxHeight: "37px", minWidth: "37px", minHeight: "39px",
                marginLeft: "4px", backgroundColor: "#ff5722", borderRadius: "5px"
            }}
                variant="contained"
                onClick={addItem}> +
            </Button>

        </div>
    )
}

export default AddItemForm