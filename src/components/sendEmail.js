// send-email.js

// We can use react-native Linking to send email
import qs from 'qs';
import { Linking } from 'react-native';


export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });
    console.log(query, " query length: ",query.length)
    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    console.log(query, " query length: ",query.length,"", canOpen)
    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }
    Linking.openURL(url).then(()=>{}).catch((err)=>{alert("error");
                                                     console.log("mail error:",err)});

}


// example.js
//
// import { sendEmail } from './send-email';
//
// sendEmail(
//     'elon@spacex.com',
//        'Can we get there?',
//     'Elon, here’s one destination you guys should consider [link]',
//  { cc: 'elon@tesla.com; elon@solarcity.com; elon@stanford.edu' }
// ).then(() => {
//     console.log('Your message was successfully sent!');
// });

//lenght: 324462 <-funktioniert nicht
//lenght: 27059 <-funktioniert nicht
//lenght: 2583032 <- funktioniert
//lenght: 209133 <- funktioniert
