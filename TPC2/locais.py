from bs4 import BeautifulSoup

arq = None

with open("arq.xml", "r", encoding="utf-8") as file:
    arq = BeautifulSoup(file.read(), features="xml")

for i, elem in enumerate(arq.find_all("ARQELEM")):
    with open(f"arq{i}.xml", "w", encoding="utf-8") as f:
        f.write(elem.prettify())

print("Done")
