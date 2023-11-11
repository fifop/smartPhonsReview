import React from 'react'
import ModalImage from "react-modal-image";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function ImageCompany() {
    const params = useParams();
    const imgURL = decodeURIComponent(params.imgURL);
    console.log("Image component rendered with URL:", imgURL);

    return (
        <div style={styles.container}>
            <ModalImage
            small={imgURL}
                large={imgURL}
                style={styles.image}

            />
             <div style={styles.container}>

                <Link className='btn btn-success' to=
                {(-1)}>Go Back</Link>
             </div>

        </div>
    );
}

const styles = {
    container: {
        display: 'block',
        justifyContent: 'center',
        margin: "20px",
    },
    image: {
        maxWidth: '2500px',
        height: 'auto', 
        display: 'block', 
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    linkContainer: {
        textAlign: 'center',
        marginTop: '20px',
    }
};



