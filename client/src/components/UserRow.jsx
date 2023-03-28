import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ClientRow({ user }) {

    return (
        <tr>
            <td>{user.username}</td>
            <td>🟪🟪🟪🟪🟪⬛⬛🟪</td>
            <td><Link to={`/groups`} className='link-secondary'>Kato Jiu-Jitsu</Link></td>
            <td>
                <Link to={`/users/${user.id}`} className='btn btn-outline-dark btn-sm'>
                    <FaEye /> View
                </Link>
            </td>
        </tr>
    );
}
