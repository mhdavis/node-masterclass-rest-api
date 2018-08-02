# Uptime Tracker (REST API Project)

## Overview

This project is a follow-along for Leslie Lewis' Node Master Class (Project 1: Building a REST API)

## Requirements

1. The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD 
1. The API allows a client (admin) to connect, then create a new user, then edit and delete that user.
1. The API allows a user to be able to "sign in" which gives them a token that they can use for subsequent authenticated requests.
1. The API allows the user to "sign out" which invalidates their token.
1. The API allows a signed-in user to use their token to create a new "check" (a task that checks a given URL to see if its up or down, user can also define "up" or "down")
1. The API allows a signed-in user to edit or delete any of their checks. (Only allow a user 0 to 5 checks)
1. In the background, workers perform all the "checks" at the appropriate times, and send alerts to the users when a check changes its state from "up" to "down", or vice versa.