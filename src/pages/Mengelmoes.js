import CommentList from "../components/listitems/CommentList";
import {CommentProvider} from "../context/CommentContext";


function Mengelmoes (props) {

    return <CommentProvider>

        <main>
        <CommentList />

        </main>
    </CommentProvider>
}

export default Mengelmoes;