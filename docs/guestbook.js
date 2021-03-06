/**
 * Web application
 */
const apiUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/f054fbe6044e0a4068e01a0a8ba8570122a9a8bd83e9d7261095a8f816e1229e/what_the_hack';
const guestbook = {
  // retrieve the existing guestbook entries
  get() {
    return $.ajax({
      type: 'GET',
      url: `${apiUrl}/entries`,
      dataType: 'json',
      success: function(result){
        console.log(result);
      }
    });
  },
  // add a single guestbood entry
  add(name, email, comment) {
    console.log('Sending', name, email, comment)
    return $.ajax({
      type: 'PUT',
      url: `${apiUrl}/entries`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        name,
        email,
        comment,
      }),
      dataType: 'json',
    });
  }
};

(function() {

  let entriesTemplate;

  function prepareTemplates() {
    entriesTemplate = Handlebars.compile($('#entries-template').html());
  }

  // retrieve entries and update the UI
  function loadEntries() {
    console.log('Loading entries...');
    $('#entries').html('Loading entries...');
    guestbook.get().done(function(result) {
      if (!result.entries) {
        return;
      }
      console.log(result);
      const context = {
        entries: result.entries
      }
      console.log(context);
      $('#entries').html(entriesTemplate(context));
    }).error(function(error) {
      $('#entries').html('No entries');
      console.log(error);
    });
  }
  
  // on document load prep and load
  $(document).ready(function() {
    prepareTemplates();
    loadEntries();
  });
})();
