import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_POST } from "../mutations/postMutations";
import { GET_POSTS } from "../queries/postQueries";
import { useMutation } from "@apollo/client";

export default function DeletePostButton({ postId }) {
    const navigate = useNavigate();

    const [deletePost] = useMutation(DELETE_POST, {
        variables: { id: postId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_POSTS }],
    });

    return (
        <>
            <button className="btn btn-danger" onClick={deletePost}>
                <FaTrash /> Delete
            </button>
        </>
    )
}