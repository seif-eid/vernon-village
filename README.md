# vernon-village

# Vernon Village Community Website User Guide

## Website Users

The website is quite easy to use from a regular user's perspective. Content can be viewed by clicking the various links in the navigation bar. Users can contact the website administrators by navigating to the "Contact Us" page and filling out the form. Users can also submit content for display on the website by navigating to the "Submit Content!" page, choosing the type of content they would like to submit, and filling out the appropriate form with the desired information. User submitted content will not be displayed until it has been approved by an administrator.

## Website Administrators

The website is administered through the administrator portal.

### Accessing the Administrator Portal

Navigate to `<domain>/addemo` or  to access the administrator portal. Iniial login credentials will be created on deployment from the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables found in the `.env` file. 

### Community Content

#### Approving community submittted content

Content that has been submitted from the user facing side of the website must be approved by an administrator before being displayed on the website. First, navigating to the "Approve Content" page in the administrator portal, and then to the relevant community content page. Content is approved by clicking the "Approve" button on the content preview card, and deleted from the database by clicking the "Reject" button.

#### Modifying currently displayed content

Content that is currently displayed on the website can be modified by navigating to the "Edit Content" page in the administrator portal. The live data can be removed from the public view by pressing the "Delete" button on the content preview card.

Note: Content that has not been approved for display will not be available for editing.
