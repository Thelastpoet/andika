<?php

class Andika_Settings {
    public function register_settings_page() {
        add_options_page(
            __('Andika Settings', 'andika'),
            __('Andika', 'andika'),
            'manage_options',
            'andika-settings',
            array($this, 'render_settings_page')
        );
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Andika Settings', 'andika'); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('andika-settings-group');
                do_settings_sections('andika-settings');
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    public function register_settings() {
		register_setting('andika-settings-group', 'andika_openai_api_key');
		register_setting('andika-settings-group', 'andika_model');
		register_setting('andika-settings-group', 'andika_n');
		register_setting('andika-settings-group', 'andika_stop');
		register_setting('andika-settings-group', 'andika_temperature');
	
		add_settings_section(
			'andika-api-settings',
			__('OpenAI API Settings', 'andika'),
			null,
			'andika-settings'
		);
	
		add_settings_field(
			'andika_openai_api_key',
			__('API Key', 'andika'),
			array($this, 'render_api_key_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		// Add new settings fields for model, n, stop, and temperature
		add_settings_field(
			'andika_model',
			__('Model', 'andika'),
			array($this, 'render_model_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_n',
			__('N', 'andika'),
			array($this, 'render_n_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_stop',
			__('Stop', 'andika'),
			array($this, 'render_stop_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_temperature',
			__('Temperature', 'andika'),
			array($this, 'render_temperature_field'),
			'andika-settings',
			'andika-api-settings'
		);
	}

    public function render_api_key_field() {
		$api_key = get_option('andika_openai_api_key');
		?>
		<input type="password" name="andika_openai_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text">
		<button id="andika-api-key-toggle" class="button"><?php _e('Show', 'andika'); ?></button>
		<?php
	}
	
	public function render_model_field() {
		$model = get_option('andika_model', 'text-davinci-003');
		?>
		<input type="text" name="andika_model" value="<?php echo esc_attr($model); ?>" class="regular-text">
		<?php
	}
	
	public function render_n_field() {
		$n = get_option('andika_n', 1);
		?>
		<input type="number" name="andika_n" value="<?php echo esc_attr($n); ?>" min="1" class="small-text">
		<?php
	}
	
	public function render_stop_field() {
		$stop = get_option('andika_stop');
		?>
		<input type="text" name="andika_stop" value="<?php echo esc_attr($stop); ?>" class="regular-text">
		<?php
	}
	
	public function render_temperature_field() {
		$temperature = get_option('andika_temperature', 0.5);
		?>
		<input type="number" name="andika_temperature" value="<?php echo esc_attr($temperature); ?>" min="0" max="1" step="0.01" class="small-text">
		<?php
	}

	public function enqueue_admin_assets($hook) {
		if ('settings_page_andika-settings' !== $hook) {
			return;
		}
	
		wp_enqueue_script(
			'andika-admin-js',
			ANDIKA_PLUGIN_URL . 'assets/js/andika-admin.js',
			array(),
			ANDIKA_VERSION,
			true
		);
	}
	
}