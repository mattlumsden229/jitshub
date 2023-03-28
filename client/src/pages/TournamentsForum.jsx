import TournamentsPosts from "../components/TournamentsPosts"
import AddPostModal from "../components/AddPostModal"

export default function TournamentsForum() {
    return (
        <div>
            <h3>Forums - Tournaments</h3>
            <AddPostModal />
            <TournamentsPosts />
        </div>
    )
}