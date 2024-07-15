import requests
from bs4 import BeautifulSoup

# URL of the GitHub repository's issues section
url = "https://github.com/Significant-Gravitas/AutoGPT/issues"

# Send a GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object with the response content
soup = BeautifulSoup(response.content, "html.parser")

# Find all the issue elements on the page
issue_elements = soup.find_all("div", class_="js-navigation-container js-active-navigation-container")

# Iterate over each issue element and extract the required information
for issue_element in issue_elements:
    # Extract the issue name
    issue_name = issue_element.find("a", class_="Link--primary").text.strip()

    # Extract the issue link
    issue_link = "https://github.com" + issue_element.find("a", class_="Link--primary")["href"]

    # Extract the issue tag
    issue_tag = issue_element.find("span", class_="Label").text.strip()

    # Print the extracted information
    print("Issue Name:", issue_name)
    print("Issue Link:", issue_link)
    print("Issue Tag:", issue_tag)
    print()