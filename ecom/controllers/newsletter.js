const mailchimp = require('@mailchimp/mailchimp_marketing');
//import mailchimp from '@mailchimp/mailchimp_marketing';

exports.create_audience = (req, res) => {
  mailchimp.setConfig({
    apiKey: 'bb08f4d4214cf1cd02c9188241cd04cf-us17',
    server: 'us17',
  });

  const event = {
    name: 'theMobileCover Newsletter',
  };

  const footerContactInfo = {
    company: 'Mailchimp',
    address1: '675 Ponce de Leon Ave NE',
    address2: 'Suite 5000',
    city: 'Atlanta',
    state: 'GA',
    zip: '30308',
    country: 'US',
  };

  const campaignDefaults = {
    from_name: "Gettin' Together",
    from_email: 'israrmughal214@gmail.com',
    subject: 'JS Developers Meetup',
    language: 'EN_US',
  };

  async function run() {
    const response = await mailchimp.lists.createList({
      name: event.name,
      contact: footerContactInfo,
      permission_reminder: 'permission_reminder',
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });

    console.log(
      `Successfully created an audience. The audience id is ${response.id}.`
    );
  }

  run();
};

exports.signup = (req, res) => {
  console.log(req.body);
  // // find the user based on email
  const email = req.body.mail;
  if (email) {
    mailchimp.setConfig({
      apiKey: 'bb08f4d4214cf1cd02c9188241cd04cf-us17',
      server: 'us17',
    });

    const listId = 'eda079e925';
    const subscribingUser = {
      firstName: 'Sheri',
      lastName: 'Ali',
      email: `${email}`,
    };

    async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
      if (response.id) {
        return res.json({ account: 'success' });
      }
    }

    run();
  }
  //   // console.log(res.json({ token, user: { _id, email, name, role } }));
};
