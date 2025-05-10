import Image from 'next/image';

import './place-img.css';

type PlaceImgProps = {
    name: string;
    url: string;
}

export function PlaceImg({ name, url }: PlaceImgProps): React.JSX.Element {
    return (
        <div className="property__image-wrapper">
            <Image 
                className="property__image" 
                src={url} 
                alt={name}
                unoptimized
                width={260}
                height={200}
            />
        </div>
    );
}
