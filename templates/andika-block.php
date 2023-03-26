<div class="wp-block-andika">
	<div class="block-editor-rich-text__editable" contenteditable="true" onChange="handleTextChange()"></div>
	<div class="wp-block-andika-output"></div>
</div>
<script>
function handleTextChange() {
	var text = document.querySelector('.block-editor-rich-text__editable').innerHTML.trim();
	if (text.length > 0) {
		// Send an AJAX request to the API endpoint.
		jQuery.post(
			andika_ajax_object.ajax_url,
			{
				action: 'andika_generate_text',
				text: text
			},
			function( response ) {
				if ( response.success ) {
					var output = response.data.choices[0].text;
					jQuery('.wp-block-andika-output').html( output );
				} else {
					jQuery('.wp-block-andika-output').html( 'Error: ' + response.error );
				}
			},
			'json'
		);
	} else {
		jQuery('.wp-block-andika-output').html( '' );
	}
}
</script>