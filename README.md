# Playground for OCR Testing
 
This is intended as a launcher for other projects.
 
Currently it's used to test Google Vision's OCR capabilities.
 
 ### Before you begin
In order use the **Google Vision API**, you will need to: 

- [follow these instructions](https://cloud.google.com/billing/docs/how-to/manage-billing-account) and set up a Google Cloud Account
- once your project is set up and billing is enabled, [you will need to enable the Could Vision API](https://console.cloud.google.com/flows/enableapi?apiid=vision.googleapis.com&_ga=2.266216207.1884611264.1612087397-1003311516.1601552592&_gac=1.259171832.1611749406.CjwKCAiAu8SABhAxEiwAsodSZHBTArgTZ3yuv4igpgoZDGYw2D_JspK5XymhV4BcwC70dhNHX1oksxoC66AQAvD_BwE) in your project.
- finally, you will need to [generate a service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey?_ga=2.195505324.1884611264.1612087397-1003311516.1601552592&_gac=1.158574152.1611749406.CjwKCAiAu8SABhAxEiwAsodSZHBTArgTZ3yuv4igpgoZDGYw2D_JspK5XymhV4BcwC70dhNHX1oksxoC66AQAvD_BwE) and save the .json file in a secure location.

### Setting up your environmental variables
When you're ready to run the app, you will first need to et the environment variable *GOOGLE_APPLICATION_CREDENTIALS* to the path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.
From the terminal, run `$ export GOOGLE_APPLICATION_CREDENTIALS=[FILEPATH TO JSON FILE KEY]`.

Finally, just run '$ npm start' from the client and server directories.
