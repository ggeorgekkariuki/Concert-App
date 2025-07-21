import Link from "next/link";

export default function NavBar() {

    return (
        <nav>
            <Link href={"/"}>Home</Link> | {" "}
            <Link href={"/events"}>Events</Link> | {" "}
            <Link href={"/artists"}>Artists</Link> | {" "}
            <Link href={"/favorites"}>Favorites</Link> | {" "}
            <Link href={"/about"}>About</Link> | {" "}
        </nav>
    )

}