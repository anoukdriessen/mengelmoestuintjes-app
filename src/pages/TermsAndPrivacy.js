import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import {useHistory} from "react-router-dom";

function TermsAndPrivacy() {
    const history = useHistory();

    return <>
        <PageHeader title='Terms and Privacy'/>

        <PageContent>
        <p>
            Duis quis magna euismod, scelerisque risus eu, viverra arcu. Phasellus cursus sapien magna, et pulvinar augue vehicula eget. Proin risus urna, auctor nec enim in, sollicitudin commodo erat. Vivamus efficitur diam nec urna vehicula feugiat. Sed eget purus nisl. Etiam mattis elementum laoreet. Sed sed magna sodales neque varius hendrerit. Donec tristique vel quam commodo sollicitudin. Fusce lobortis porttitor tellus, at tincidunt quam auctor quis. Phasellus eros velit, ullamcorper sit amet tempus et, viverra lobortis orci. Nulla consequat, diam eget rutrum bibendum, leo diam viverra massa, vel porta massa nulla id urna. Aliquam sed dignissim sem.
        </p>
        <p>
            Vestibulum eget nibh at orci venenatis aliquet. Nunc eget suscipit velit. Nam convallis ut dolor sed pretium. Vivamus non arcu nec lacus suscipit tincidunt. Fusce non ipsum eget tellus feugiat congue vel vitae est. Nam et erat sagittis, sodales nisl nec, sodales magna. Nunc id turpis sed velit tincidunt scelerisque ac consectetur nulla. Phasellus dignissim tortor et tristique volutpat. Nunc felis quam, pellentesque sed ultrices quis, varius vel ex.
        </p>
        <p>
            Ut fermentum rhoncus sodales. Phasellus sit amet magna varius, semper ligula sit amet, vestibulum metus. Duis dignissim rhoncus rhoncus. Nunc eu ligula a magna volutpat interdum. Ut vulputate ante enim, sit amet faucibus sem vestibulum sit amet. Donec at hendrerit nisl, vitae iaculis felis. Pellentesque vel ultricies dolor, et sollicitudin sem. Nunc congue posuere ullamcorper. Cras libero dui, blandit vel consectetur ac, placerat ac est. Sed mollis tristique fermentum. Ut fermentum eros quis augue dignissim auctor. Maecenas varius ultricies vestibulum. Ut vehicula, felis nec tristique malesuada, mauris felis viverra nulla, sed tincidunt ante mi nec sem. Vivamus tincidunt, elit non bibendum tincidunt, nulla nibh sagittis sapien, non congue ipsum diam quis nisi. In vitae volutpat tellus. Nullam nec dui ut sapien semper porttitor. Sed lorem ante, gravida id fringilla vel, ultrices a magna. Praesent in sollicitudin tortor. Donec erat tellus, lacinia id blandit in, commodo et dolor. Donec bibendum pretium mollis. Donec hendrerit ipsum aliquam consequat luctus. Vivamus blandit lobortis ex ac mattis. Aenean in tincidunt enim. Ut iaculis nisl sodales felis pretium, at facilisis felis pharetra.Sed congue eu lectus sit amet rhoncus. Vivamus facilisis nibh id gravida sollicitudin. Nam pretium molestie eleifend. Integer mi quam, blandit et arcu vel, rhoncus malesuada neque. Suspendisse potenti. Cras luctus lorem nec sollicitudin ullamcorper. Nullam ornare ligula ut turpis sollicitudin, ut pharetra dui luctus. Maecenas eget ex eget tortor feugiat pulvinar.
        </p>
            <span className={'link'}
                onClick={() => history.push('/contact')}
            >Nog vragen? Neem contact met ons op.</span>
        </PageContent>
    </>
}

export default TermsAndPrivacy;