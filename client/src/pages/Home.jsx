import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
            <h3 className="text-center">Welcome to JitsHUB</h3>
            <div className="row d-flex justify-content-center mt-5">
                <div className="d-flex justify-content-center col-md-6">
                    <div className="card mb-2">
                        <Link to="/forums/general" className="text-decoration-none">
                            <div className="card-body align-self-center">
                                <img src="https://imageio.forbes.com/specials-images/imageserve/63d44edb4d1fabfdd05c8564/Other---Gordon-Ryan---Bane-Visnjic/0x0.jpg?format=jpg&crop=1600,900,x0,y134,safe&width=960" alt="" className="img-fluid" />
                                <h5 className="text-center link-secondary mt-3">General Forum</h5>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="d-flex justify-content-center col-md-6">
                    <div className="card mb-2">
                        <Link to="/forums/tournaments" className="text-decoration-none">
                            <div className="card-body align-self-center">
                                <img src="https://cdn.evolve-mma.com/wp-content/uploads/2021/12/history-of-ibjjf.jpg" alt="" className="img-fluid" />
                                <h5 className="text-center link-secondary mt-3">Tournaments Forum</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}