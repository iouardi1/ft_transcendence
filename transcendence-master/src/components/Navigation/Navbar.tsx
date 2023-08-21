import HorzNav from "./HorzNav";
import VertNav from "./VertNav";

export default function Navbar(props: any) {

    return (
        <>
            <HorzNav darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} open={props.open} toggleOpen={props.toggleOpen} />
            <VertNav open={props.open} />
        </>
    );
}
