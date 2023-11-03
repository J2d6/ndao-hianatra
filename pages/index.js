import { verifyTokens } from "@/lib/authLib";
import { parse } from "cookieparser";


export default function HomePage ({data}) {

    return (
        <div>
            <h1>Home page { data }</h1>
        </div>
    )
}


// export async function getServerSideProps ( context ) {
//     if (verfySignedTokens(context.req)) { // without account's type verification
//         return  {
//             props : {
//                 data : "Coucou"
//             }
//         }
//     }
//     return {
//         redirect : {
//             destination : "/auth/login",
//             permanent : false
//         }
//     }

// }