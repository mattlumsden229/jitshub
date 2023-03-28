import { useQuery } from "@apollo/client"
import { GET_USERS } from "../queries/userQueries"
import Table from 'react-bootstrap/Table';
import UserRow from '../components/UserRow';

export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            {!loading && !error && (
                <div>
                    <h3>All Users</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Rank</th>
                                <th>Group</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user) => (
                                <UserRow key={user.id} user={user} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    )
}