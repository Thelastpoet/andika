<?php

class Andika_Settings {
    public function register_settings_page() {
        add_menu_page(
            __('Andika Settings', 'andika'),
            __('Andika', 'andika'),
            'manage_options',
            'andika-settings',
            array($this, 'render_settings_page'),
            'dashicons-lightbulb',
            20
        );		
    }

    public function render_settings_page() {
        ?>
        <div class="wrap andika-wrap">
            <h2><?php _e('Andika Settings', 'andika'); ?></h2>
			<div class="andika-tabs-container">
				<h2 class="nav-tab-wrapper">
					<a href="#general" class="nav-tab"><?php _e('General', 'andika'); ?></a>
					<a href="#openai-settings" class="nav-tab"><?php _e('Andika AI Settings', 'andika'); ?></a>
					<a href="#help" class="nav-tab"><?php _e('Documentation', 'andika'); ?></a>
				</h2>

				<div class="andika-settings-content">
					<div id="general" class="andika-settings-tab">
						<h2><?php _e('General', 'andika'); ?></h2>
					</div>

					<div id="openai-settings" class="andika-settings-tab">
						<form method="post" action="options.php">
							<?php
							settings_fields('andika-settings-group');
							do_settings_sections('andika-settings');
							submit_button();
							?>
						</form>
					</div>

					<div id="help" class="andika-settings-tab">
						<h2><?php _e('Documentation', 'andika'); ?></h2>
						<?php include ANDIKA_PLUGIN_DIR . 'includes/admin/doc-content.php'; ?>
					</div>
				</div>
			</div>
        </div>
        <?php
    }

    public function register_settings() {
		register_setting('andika-settings-group', 'andika_openai_api_key', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('andika-settings-group', 'andika_model', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('andika-settings-group', 'andika_n', array('sanitize_callback' => 'intval'));
        register_setting('andika-settings-group', 'andika_stop', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('andika-settings-group', 'andika_temperature', array('sanitize_callback' => 'floatval'));
		register_setting('andika-settings-group', 'andika_best_of', array('sanitize_callback' => 'intval'));
		register_setting('andika-settings-group', 'andika_frequency_penalty', array('sanitize_callback' => 'floatval'));
		register_setting('andika-settings-group', 'andika_presence_penalty', array('sanitize_callback' => 'floatval'));
		register_setting('andika-settings-group', 'andika_max_tokens', array('sanitize_callback' => 'intval'));
    	register_setting('andika-settings-group', 'andika_top_p', array('sanitize_callback' => 'floatval'));
	
		add_settings_section(
			'andika-api-settings',
			__('Andika API Settings', 'andika'),
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

		add_settings_field(
			'andika_best_of',
			__('Best Of', 'andika'),
			array($this, 'render_best_of_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_frequency_penalty',
			__('Frequency Penalty', 'andika'),
			array($this, 'render_frequency_penalty_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_presence_penalty',
			__('Presence Penalty', 'andika'),
			array($this, 'render_presence_penalty_field'),
			'andika-settings',
			'andika-api-settings'
		);

		add_settings_field(
			'andika_max_tokens',
			__('Max Tokens', 'andika'),
			array($this, 'render_max_tokens_field'),
			'andika-settings',
			'andika-api-settings'
		);
	
		add_settings_field(
			'andika_top_p',
			__('Top p', 'andika'),
			array($this, 'render_top_p_field'),
			'andika-settings',
			'andika-api-settings'
		);
	}

    public function render_api_key_field() {
		$api_key = get_option('andika_openai_api_key');
		?>
		<input type="password" name="andika_openai_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text">
		<button id="andika-api-key-toggle" class="button"><?php esc_html_e('Show', 'andika'); ?></button>
		<p class="description"><?php _e('You can get your API Keys in your <a href="https://beta.openai.com/signup" target="_blank">OpenAI Account</a>.', 'andika'); ?></p>
		<?php
	}
	
	public function render_model_field() {
		$models = array(
			'text-davinci-003' => 'text-davinci-003',
			'text-curie-001'   => 'text-curie-001',
			'text-babbage-001' => 'text-babbage-001',
			'text-ada-001'     => 'text-ada-001',
		);
		$selected_model = get_option('andika_model', 'text-davinci-003');
		?>
		<select name="andika_model">
			<?php foreach ($models as $model => $label): ?>
				<option value="<?php echo esc_attr($model); ?>" <?php selected($selected_model, $model); ?>><?php echo esc_html($label); ?></option>
			<?php endforeach; ?>
		</select>
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

	public function render_best_of_field() {
		$best_of = get_option('andika_best_of', 1);
		?>
		<input type="number" name="andika_best_of" value="<?php echo esc_attr($best_of); ?>" min="1" class="small-text">
		<?php
	}
	
	public function render_frequency_penalty_field() {
		$frequency_penalty = get_option('andika_frequency_penalty', 0);
		?>
		<input type="number" name="andika_frequency_penalty" value="<?php echo esc_attr($frequency_penalty); ?>" min="0" max="1" step="0.01" class="small-text">
		<?php
	}
	
	public function render_presence_penalty_field() {
		$presence_penalty = get_option('andika_presence_penalty', 0);
		?>
		<input type="number" name="andika_presence_penalty" value="<?php echo esc_attr($presence_penalty); ?>" min="0" max="1" step="0.01" class="small-text">
		<?php
	}

	public function render_max_tokens_field() {
		$max_tokens = get_option('andika_max_tokens', 1000);
		?>
		<input type="number" name="andika_max_tokens" value="<?php echo esc_attr($max_tokens); ?>" min="1" class="small-text">
		<?php
	}
	
	public function render_top_p_field() {
		$top_p = get_option('andika_top_p', 1);
		?>
		<input type="number" name="andika_top_p" value="<?php echo esc_attr($top_p); ?>" min="0" max="1" step="0.01" class="small-text">
		<?php
	}

	public function enqueue_admin_assets($hook) {
		if ('toplevel_page_andika-settings' !== $hook) {
			return;
		}
	
		wp_enqueue_style(
			'andika-admin',
			ANDIKA_PLUGIN_URL . 'assets/css/andika-admin.css',
			array(),
			ANDIKA_VERSION
		);
	
		wp_enqueue_script(
			'andika-admin',
			ANDIKA_PLUGIN_URL . 'assets/js/andika-admin.js',
			array('jquery'),
			ANDIKA_VERSION,
			true
		);
	}	
}