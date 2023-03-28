import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../mutations/postMutations";
import { GET_POST } from "../queries/postQueries";
import { FaRegEdit } from "react-icons/fa";

export default function EditPostModal({ post }) {

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [forum, setForum] = useState(() => {
        switch (post.forum) {
            case "General":
                return "general";
            case "Tournaments":
                return "tournaments";
            default:
                throw new Error(`Unknown forum: ${post.forum}`);
        }
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        variables: { id: post.id, title, description, forum },
        refetchQueries: [{ query: GET_POST, variables: { id: post.id } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '' || description === '') {
            return alert('Please fill out all fields');
        }

        updatePost(title, description, forum);
    };

    // if (loading) return null;
    // if (error) return 'Something Went Wrong';

    return (
        <>
            <button type='button' className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#updatePostModal'>
                <FaRegEdit /> Edit
            </button>

            <div className="modal fade" id="updatePostModal" aria-labelledby="updatePostModalLabel" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updatePostModalLabel">
                                Update Post
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Forum</label>
                                    <select
                                        id='forum'
                                        className='form-select'
                                        value={forum}
                                        onChange={(e) => setForum(e.target.value)}
                                    >
                                        <option value='general'>General</option>
                                        <option value='tournaments'>Tournaments</option>
                                    </select>
                                </div>

                                <button type="submit" data-bs-dismiss='modal' className="btn btn-dark">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}