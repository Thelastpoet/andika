jQuery(document).ready(function($) {
    // Toggle visibility of the OpenAI API key
    const apiKeyInput = $('[name="andika_openai_api_key"]');
    const apiKeyToggle = $('#andika-api-key-toggle');

    if (apiKeyInput.length && apiKeyToggle.length) {
        apiKeyToggle.on('click', function(event) {
            event.preventDefault();

            if (apiKeyInput.attr('type') === 'password') {
                apiKeyInput.attr('type', 'text');
                apiKeyToggle.text('Hide');
            } else {
                apiKeyInput.attr('type', 'password');
                apiKeyToggle.text('Show');
            }
        });
    }

    // Handle tab navigation
    var $tabs = $('.andika-wrap .nav-tab-wrapper a');
    var $content = $('.andika-settings-tab');

    function setActiveTab(target) {
        // Set the active tab
        $tabs.removeClass('nav-tab-active');
        $('a[href="#' + target + '"]').addClass('nav-tab-active');

        // Show the corresponding content
        $content.hide();
        $('#' + target).show();
    }

    $tabs.on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('href').replace('#', '');
        setActiveTab(target);
        localStorage.setItem('andika_active_tab', target);
    });

    // Show the stored tab or the first tab by default
    var activeTab = localStorage.getItem('andika_active_tab') || $tabs.first().attr('href').replace('#', '');
    setActiveTab(activeTab);
});