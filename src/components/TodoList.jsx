import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemSecondaryAction } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TodoList = () => {
    const [todos, setTodos] = useState([] || JSON.parse(localStorage.getItem("todos")));
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleEditTodo = (index, value) => {
        // set the index and value of the todo in the Dialog form
        formikEdit.setFieldValue("editIndex", index);
        formikEdit.setFieldValue("editTodo", value);
        // open the dialog
        setDialogOpen(true);
    }

    const formik = useFormik({
        initialValues: {
            newTodo: "",
        },
        onSubmit: (values, { resetForm }) => {
            setTodos([...todos, values.newTodo]);
            formik.resetForm();
        },
        validate: (values) => {
            const errors = {};
            if (!values.newTodo) {
                errors.newTodo = "Please enter a todo*";
            }
            return errors;
        }
    });

    const formikEdit = useFormik({
        initialValues: {
            editIndex: "",
            editTodo: "",
        },
        onSubmit: (values, { resetForm }) => {
            const newTodos = [...todos];
            newTodos[values.editIndex] = values.editTodo;
            setTodos(newTodos);
            resetForm();
            setDialogOpen(false);
        },
        validate: (values) => {
            const errors = {};
            if (!values.editTodo) {
                errors.editTodo = "Please enter a todo*";
            }
            return errors;
        }
    });

    return (
        <>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Grid container sx={
                    {
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        maxWidth: "700px",
                        padding: "20px 50px",
                        marginTop: "20px",
                    }
                }>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div>
                            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>To Do App</Typography>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    label="New Todo"
                                    name="newTodo"
                                    value={formik.values.newTodo}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                {
                                    formik.errors.newTodo && formik.touched.newTodo && (
                                        <div style={{ color: "red", marginBottom: '15px' }}>{formik.errors.newTodo}</div>
                                    )
                                }
                                <Button type="submit" variant="contained" color="primary">
                                    Add
                                </Button>
                            </form>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
                                Total Todos: {todos.length}
                            </Typography>
                            <List>
                                {todos.map((todo, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={todo} />
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <Edit onClick={() => handleEditTodo(index, todo)} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteTodo(index)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div></Grid>
                </Grid>
            </Container>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Edit Todo</DialogTitle>
                <form onSubmit={formikEdit.handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Edit Todo"
                            name="editTodo"
                            value={formikEdit.values.editTodo}
                            onChange={formikEdit.handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {
                            formikEdit.errors.editTodo && formikEdit.touched.editTodo && (
                                <div style={{ color: "red", marginBottom: '15px' }}>{formikEdit.errors.editTodo}</div>
                            )
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default TodoList;
