import GeneralPosts from "../components/GeneralPosts"
import AddPostModal from "../components/AddPostModal"

export default function GeneralForum() {
    return (
        <div>
            <h3>Forums - General</h3>
            <AddPostModal />
            <GeneralPosts />
        </div>
    )
}