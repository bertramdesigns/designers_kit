<?php

require 'vendor/autoload.php';

use Appwrite\Client;
use Appwrite\ID;

function initClient($endpoint) {
    return (new Client())
        ->setEndpoint($endpoint) // Your API Endpoint
        ->setProject('console') // Your project ID
        ->setKey(getenv('_APP_OPENSSL_KEY_V1')); // API key from .env
}

function createUser($client, $userID, $email, $password) {
    $client->call(
        Client::METHOD_POST, 
        '/account', 
        ['content-type' => 'application/json'], 
        [
            'userId' => $userID,
            'email' => $email,
            'password' => $password,
            'name' => 'Admin'
        ]
    );
}

function authenticateUser($endpoint, $email, $password) {
    // PHP SDK in the vendor files strips the headers, so we need to use curl directly
    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $endpoint . '/account/sessions',
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true, // Return response as a string
        CURLOPT_HEADER => true,        // Include headers in the output
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode([
            'email' => $email,
            'password' => $password,
        ]),
    ]);

    $response = curl_exec($ch);

    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $headerSize);
    $body = substr($response, $headerSize);

    curl_close($ch);

    preg_match_all('/Set-Cookie:\s*(a_session_console=.*?);/i', $headers, $matches);

    if (!empty($matches[1])) {
        $sessionCookie = $matches[1][0];
        $sessionCookie = str_replace('a_session_console=', '', $sessionCookie);
        echo "\nSession cookie: $sessionCookie\n";
        return $sessionCookie;
    } else {
        echo "Session cookie not found.\n Cannot complete setup.\n";
        exit(1);
    }
}

function createOrganization($client, $orgID) {
    $org = $client->call(
        Client::METHOD_POST,
        '/teams',
        ['content-type' => 'application/json'],
        [
            'teamId' => $orgID,
            'name' => 'Your Organization',
        ]
    );
    return $org['$id'];
}

function associateUserWithOrganization($client, $orgID) {
    $client->call(
        Client::METHOD_PATCH,
        '/account/prefs',
        ['content-type' => 'application/json'],
        [
            'prefs' => ['organization' => $orgID],
        ]
    );
}

// Env variables are added in the Docker call in init.sh
$domain = getenv('_APP_DOMAIN');
$endpoint = str_replace('{DOMAIN}', $domain, 'http://{DOMAIN}/v1');
echo "Using endpoint: $endpoint\n"; // Debug statement
echo "Domain: $domain\n"; // Debug statement
$userID = ID::unique();
$orgID = getenv('DEFAULT_ORG_ID');
$email = getenv('DEFAULT_ADMIN_EMAIL');
$password = getenv('DEFAULT_ADMIN_PASSWORD');

$client = initClient($endpoint);

createUser($client, $userID, $email, $password);

$sessionCookie = authenticateUser($endpoint, $email, $password);

// Must add session cookie. Otherwise the request will be from Guest and fail.
$client->addHeader('Cookie', "a_session_console_legacy=" . $sessionCookie);
$client->addHeader('X-Fallback-Cookies', json_encode(["a_session_console"=>$sessionCookie]));
$client->setKey(null);

$orgResult = createOrganization($client, $orgID);
echo "\nOrganization ID: $orgResult\n";

associateUserWithOrganization($client, $orgID);
echo "\nAssociated user with organization.\n";

echo "\n\nPlease remember to change your password after login. \n";