<?php

// Check if the user is logged in and can edit posts
if (!is_user_logged_in() || !current_user_can('edit_posts')) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

// Get the request data
$data = json_decode(file_get_contents('php://input'), true);

// Perform your text generation logic here (same as handle_generate_text method)
$api_key = get_option('andika_openai_api_key');
$prompt = $data['prompt'];

$openai_api = new Andika_OpenAI_API($api_key);
$generated_text = $openai_api->generate_text($prompt);

// Return the generated text as JSON
http_response_code(200);
header('Content-Type: application/json');
echo json_encode(['generated_text' => $generated_text]);