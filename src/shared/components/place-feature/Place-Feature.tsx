import './place-feature.css';

type FeatureProps = {
    feature: string;
}

export function PlaceFeature({ feature }: FeatureProps): React.JSX.Element {
    return <li className="property__inside-item">{feature}</li>
}