import type { Lesson } from "@/data/types";

export const lessons: Lesson[] = [
  {
    id: "terrain",
    index: 1,
    title: "Le terrain de l'examen",
    promise: "Savoir quel objet écrire avant même de toucher au SQL.",
    minutes: 12,
    skills: ["SQL", "PL/SQL", "barème"],
    steps: [
      {
        id: "deux-langages",
        kicker: "Repère",
        title: "Deux langages, une copie",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Dans cette UE, **SQL** décrit et manipule les données : tables, lignes, vues. **PL/SQL** est le langage procédural d'Oracle : variables, `IF`, boucles, fonctions, procédures, triggers.",
              "Une copie mélange les deux. Le verbe du sujet te dit lequel sortir. Si tu hésites, tu perds des points de syntaxe avant même d'avoir touché au métier.",
            ],
          },
          {
            type: "table",
            title: "Le verbe décide de l'objet",
            columns: ["Le sujet dit…", "Tu écris…"],
            rows: [
              ["Donnez le code de création de la table", "CREATE TABLE"],
              ["Créez une vue qui affiche…", "CREATE OR REPLACE VIEW"],
              ["Empêche l'ajout si…", "TRIGGER BEFORE + RAISE"],
              ["Fonction qui retourne le nombre…", "CREATE FUNCTION … RETURN NUMBER"],
              ["Procédure qui met à jour…", "CREATE PROCEDURE + UPDATE"],
              ["Affichez pour chaque ligne…", "Bloc anonyme + curseur FOR"],
              ["Générez des identifiants M100, M110…", "SEQUENCE + trigger"],
            ],
          },
          {
            type: "callout",
            tone: "exam",
            title: "Ce que le correcteur sanctionne",
            body: "Noms imposés (`TRG_BloquerComment`, `NbContentsByLanguage`), syntaxe exécutable, et pas du pseudo-code. Un script qui ne compilerait pas est une réponse fausse, même si l'idée est bonne.",
          },
        ],
      },
      {
        id: "squelette",
        kicker: "Comment",
        title: "Le squelette, toujours dans le même ordre",
        blocks: [
          {
            type: "recipe",
            title: "Pour tout objet PL/SQL stocké",
            items: [
              "CREATE OR REPLACE, puis le mot FUNCTION, PROCEDURE ou TRIGGER, puis le nom exact du sujet.",
              "Les paramètres entre parenthèses, avec un type (souvent ancré : table.colonne%TYPE).",
              "Pour une fonction seulement : RETURN, puis le type de la valeur renvoyée.",
              "IS ou AS, puis les variables locales.",
              "BEGIN … END;",
              "Dans SQL*Plus ou un script, une ligne contenant uniquement / pour exécuter le bloc.",
            ],
          },
          {
            type: "code",
            title: "Squelette à recopier de mémoire",
            code: `CREATE OR REPLACE FUNCTION nom_exact (
  p_id IN table.id%TYPE
) RETURN NUMBER
IS
  v_resultat NUMBER;
BEGIN
  -- le métier ici
  RETURN v_resultat;
END;
/`,
          },
          {
            type: "callout",
            tone: "tip",
            title: "Point-virgule et slash",
            body: "Le `;` termine une instruction SQL ou un `END`. Le `/` n'est pas du PL/SQL : il dit à l'outil d'exécuter le bloc qui précède. Sur une copie papier, beaucoup de correcteurs l'attendent quand même.",
          },
        ],
      },
      {
        id: "modele",
        kicker: "Méthode",
        title: "Lire le modèle logique avant d'écrire",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Les sujets notent un extrait du genre `Etudiants(id, nom, #classe_id)`. Le `#` marque une **clé étrangère**. Un attribut souligné, en gras ou suivi de « clé » est la **clé primaire**.",
              "`date_inscription` n'est pas une clé, même si un dièse traîne parfois sur la feuille. Tu le traduis en `DATE`. En cas de doute sur un dièse bizarre, regarde si une table porte ce nom : sinon, ce n'est pas une FK.",
            ],
          },
          {
            type: "recipe",
            title: "Ordre de création",
            items: [
              "D'abord les tables sans FK (roles, languages, classes).",
              "Ensuite les tables qui les référencent.",
              "Les séquences et triggers d'identifiant.",
              "Les vues, qui ont le droit de lire des tables déjà créées.",
              "Les fonctions et procédures.",
              "Les triggers métier en dernier, quand les tables cibles existent.",
            ],
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "terrain-1",
        points: 1,
        prompt: "Le sujet dit : « Créez une fonction qui retourne le nombre de contenus ». Quel objet écris-tu ?",
        choices: [
          { id: "a", text: "Une procédure avec un paramètre OUT" },
          { id: "b", text: "Une fonction qui RETURN un NUMBER" },
          { id: "c", text: "Un trigger BEFORE INSERT" },
          { id: "d", text: "Une vue" },
        ],
        answer: "b",
        why: "« Retourne » impose une fonction. La procédure ne renvoie pas de valeur par RETURN. La vue affiche, elle ne se « appelle » pas avec un paramètre aussi naturellement dans ces sujets.",
      },
      {
        kind: "mcq",
        id: "terrain-2",
        points: 1,
        prompt: "Dans un script SQL*Plus, qu'est-ce qui lance vraiment l'exécution d'un bloc PL/SQL ?",
        choices: [
          { id: "a", text: "Le mot COMMIT" },
          { id: "b", text: "Une ligne qui ne contient que /" },
          { id: "c", text: "Le mot GO" },
          { id: "d", text: "Un point-virgule après CREATE" },
        ],
        answer: "b",
        why: "Le `/` seul sur sa ligne demande l'exécution. `GO` est SQL Server. `COMMIT` valide une transaction, il ne compile pas le bloc.",
      },
      {
        kind: "mcq",
        id: "terrain-3",
        points: 1,
        prompt: "Le modèle dit `Commentaire(#id_utilisateur, id_contenu, note)`. Que signifie le dièse ?",
        choices: [
          { id: "a", text: "La colonne est optionnelle" },
          { id: "b", text: "La colonne est une clé étrangère" },
          { id: "c", text: "La colonne est un BOOLEAN" },
          { id: "d", text: "La colonne est calculée" },
        ],
        answer: "b",
        why: "Convention des sujets : `#` = clé étrangère. Tu écris `CONSTRAINT … FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur)`.",
      },
    ],
  },
  {
    id: "tables",
    index: 2,
    title: "Créer une table",
    promise: "Poser types, clés et contraintes du premier coup.",
    minutes: 20,
    skills: ["CREATE TABLE", "NUMBER", "VARCHAR2", "DATE", "CHECK"],
    steps: [
      {
        id: "types",
        kicker: "Vocabulaire",
        title: "Les types qu'Oracle attend sur la copie",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "N'invente pas `INT`, `STRING` ou `BOOLEAN` dans un `CREATE TABLE` de cette UE. Oracle classique veut ses types à lui. `BOOLEAN` existe en **variable PL/SQL**, pas comme colonne (avant Oracle 23c, que tes sujets n'utilisent pas).",
            ],
          },
          {
            type: "table",
            columns: ["Le sujet dit", "Tu écris"],
            rows: [
              ["Numérique, clé primaire", "NUMBER"],
              ["Numérique salaire, défaut 2500", "NUMBER DEFAULT 2500"],
              ["Chaîne, taille max 50", "VARCHAR2(50)"],
              ["Date, obligatoire", "DATE NOT NULL"],
              ["Texte long d'un article", "CLOB"],
              ["Vrai / faux en PL/SQL seulement", "BOOLEAN"],
            ],
          },
          {
            type: "callout",
            tone: "trap",
            title: "VARCHAR2 a toujours une taille",
            body: "`nom VARCHAR2` est illégal. Il faut `VARCHAR2(50)` ou un ancrage `%TYPE` (en PL/SQL, pas dans CREATE TABLE).",
          },
        ],
      },
      {
        id: "recette",
        kicker: "Recette",
        title: "Écrire le CREATE TABLE en six lignes mentales",
        blocks: [
          {
            type: "recipe",
            title: "Dans l'ordre",
            items: [
              "CREATE TABLE nom_exact (  — le nom du sujet, pas un synonyme.",
              "Chaque colonne : nom, type, puis seulement ensuite NULL / NOT NULL / DEFAULT.",
              "La clé primaire sur la colonne, ou CONSTRAINT pk_… PRIMARY KEY (col) en fin de liste.",
              "Chaque FK : CONSTRAINT fk_… FOREIGN KEY (col) REFERENCES table_mere(col_mere).",
              "Les CHECK et UNIQUE nommé, pour pouvoir les relire.",
              "Parenthèse fermée puis point-virgule.",
            ],
          },
          {
            type: "code",
            title: "La table EMPLOYEES du sujet de session",
            code: `CREATE TABLE employees (
  id             NUMBER PRIMARY KEY,
  nom            VARCHAR2(50),
  prenom         VARCHAR2(50),
  date_embauche  DATE NOT NULL,
  salaire        NUMBER DEFAULT 2500
);`,
            caption: "DEFAULT s'applique seulement si la colonne est absente de l'INSERT, ou explicitement DEFAULT.",
          },
        ],
      },
      {
        id: "contraintes",
        kicker: "Contrats",
        title: "PK, FK, UNIQUE, CHECK, NOT NULL",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Une **clé primaire** interdit les doublons et les NULL. Une **clé étrangère** oblige la valeur à exister dans la table mère, ou à être NULL. **UNIQUE** interdit les doublons mais accepte plusieurs NULL. **CHECK** est une condition booléenne SQL, pas du PL/SQL.",
            ],
          },
          {
            type: "code",
            title: "Table fille avec FK et CHECK",
            code: `CREATE TABLE comments (
  id_comment   NUMBER PRIMARY KEY,
  texte        VARCHAR2(1000) NOT NULL,
  note         NUMBER NOT NULL,
  date_comment DATE DEFAULT SYSDATE,
  id_user      NUMBER NOT NULL,
  id_content   NUMBER NOT NULL,
  CONSTRAINT fk_com_user
    FOREIGN KEY (id_user) REFERENCES users (id_user),
  CONSTRAINT fk_com_content
    FOREIGN KEY (id_content) REFERENCES contents (id_content),
  CONSTRAINT ck_com_note CHECK (note BETWEEN 0 AND 5)
);`,
          },
          {
            type: "callout",
            tone: "exam",
            title: "CHECK ne remplace pas un trigger",
            body: "Un CHECK ne peut pas lire une autre table. « La note est entre 0 et 5 » peut être un CHECK. « Le contenu visé a le statut valide » exige un trigger, parce qu'il faut aller lire `contenu`.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "tables-1",
        points: 1,
        prompt: "Quel type choisis-tu pour un salaire avec une valeur par défaut ?",
        choices: [
          { id: "a", text: "BOOLEAN DEFAULT 2500" },
          { id: "b", text: "NUMBER DEFAULT 2500" },
          { id: "c", text: "VARCHAR2 DEFAULT 2500" },
          { id: "d", text: "INT AUTO_INCREMENT" },
        ],
        answer: "b",
        why: "NUMBER est le numérique Oracle. AUTO_INCREMENT est MySQL. BOOLEAN n'est pas un type de colonne dans tes sujets.",
      },
      {
        kind: "mcq",
        id: "tables-2",
        points: 1,
        prompt: "Pourquoi un CHECK (statut = 'valide') sur commentaire ne suffit pas à vérifier le statut du contenu ?",
        choices: [
          { id: "a", text: "CHECK ne peut consulter qu'une autre ligne d'une autre table" },
          { id: "b", text: "CHECK ne peut pas lire une autre table" },
          { id: "c", text: "CHECK n'existe pas dans Oracle" },
          { id: "d", text: "Il faut un index pour cela" },
        ],
        answer: "b",
        why: "La condition CHECK reste dans la ligne en cours d'écriture. Dès qu'il faut un SELECT ailleurs, c'est un trigger.",
      },
      {
        kind: "mcq",
        id: "tables-3",
        points: 1,
        prompt: "La table `comments` référence `contents`. Laquelle crée-tu en premier ?",
        choices: [
          { id: "a", text: "comments, puis contents" },
          { id: "b", text: "contents, puis comments" },
          { id: "c", text: "L'ordre n'a aucune importance" },
          { id: "d", text: "On les crée dans une vue" },
        ],
        answer: "b",
        why: "La FK ne peut pointer que vers une table déjà créée (sauf si tu ajoutes la contrainte plus tard avec ALTER TABLE).",
      },
    ],
  },
  {
    id: "alter",
    index: 3,
    title: "Modifier une table déjà créée",
    promise: "ALTER TABLE, contraintes ajoutées après coup, renommage.",
    minutes: 14,
    skills: ["ALTER TABLE", "RENAME", "ADD CONSTRAINT"],
    steps: [
      {
        id: "alter",
        kicker: "Recette",
        title: "ALTER TABLE est la seule commande de structure",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Changer les colonnes d'une table existante ne se fait ni avec `UPDATE` (ça change les **lignes**), ni avec `CHANGE` ou `MODIFY TABLE` (ça n'existe pas). La commande est **`ALTER TABLE`**.",
            ],
          },
          {
            type: "code",
            title: "Les trois gestes du sujet EMPLOYEES",
            code: `-- Ajouter une règle : salaire au moins 33500
ALTER TABLE employees
  ADD CONSTRAINT ck_emp_salaire CHECK (salaire >= 33500);

-- Élargir une chaîne
ALTER TABLE employees MODIFY (nom VARCHAR2(80));

-- Ajouter une colonne
ALTER TABLE contenu ADD (date_validation DATE);`,
          },
          {
            type: "callout",
            tone: "trap",
            title: "Le piège du chiffre 33500",
            body: "Le sujet de session met DEFAULT 2500 puis demande un CHECK à 33500. Les deux ensemble rendent le défaut illégal. Sur la copie, tu suis le chiffre demandé. Tu peux signaler l'incohérence en une phrase, sans « corriger » l'énoncé.",
          },
        ],
      },
      {
        id: "rename",
        kicker: "Piège classique",
        title: "Renommer, version Oracle",
        blocks: [
          {
            type: "compare",
            title: "MySQL n'est pas Oracle",
            bad: "RENAME TABLE ancienne_table TO nouvelle_table;",
            good: "ALTER TABLE ancienne_table RENAME TO nouvelle_table;",
            note: "Oracle accepte aussi `RENAME ancienne_table TO nouvelle_table;` sans le mot TABLE. La forme du QCM qui gagne est ALTER TABLE … RENAME TO.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "alter-1",
        points: 1,
        prompt: "Quelle commande modifie la structure d'une table existante ?",
        choices: [
          { id: "a", text: "CHANGE TABLE" },
          { id: "b", text: "MODIFY TABLE" },
          { id: "c", text: "ALTER TABLE" },
          { id: "d", text: "UPDATE TABLE" },
        ],
        answer: "c",
        why: "C'est la question 1 du QCM de session. UPDATE modifie des valeurs, pas des colonnes.",
      },
      {
        kind: "mcq",
        id: "alter-2",
        points: 1,
        prompt: "Comment renommer une table dans Oracle ?",
        choices: [
          { id: "a", text: "RENAME TABLE a TO b" },
          { id: "b", text: "ALTER TABLE a RENAME TO b" },
          { id: "c", text: "UPDATE TABLE a SET NAME = b" },
          { id: "d", text: "CHANGE TABLE a TO b" },
        ],
        answer: "b",
        why: "A est la syntaxe MySQL. C et D n'existent pas.",
      },
      {
        kind: "mcq",
        id: "alter-3",
        points: 1,
        prompt: "Le salaire ne doit pas descendre sous 33500, table déjà créée. Tu écris…",
        choices: [
          { id: "a", text: "UPDATE employees SET CONSTRAINT salaire >= 33500" },
          { id: "b", text: "ALTER TABLE employees ADD CONSTRAINT ck CHECK (salaire >= 33500)" },
          { id: "c", text: "CREATE TRIGGER seulement, CHECK est interdit sur NUMBER" },
          { id: "d", text: "GRANT CHECK ON employees" },
        ],
        answer: "b",
        why: "Une règle sur la même ligne s'ajoute avec ADD CONSTRAINT … CHECK. Un trigger serait excessif ici.",
      },
    ],
  },
  {
    id: "lignes",
    index: 4,
    title: "Lignes, DELETE et séquences",
    promise: "Insérer, vider, et fabriquer des identifiants.",
    minutes: 18,
    skills: ["INSERT", "DELETE", "TRUNCATE", "SEQUENCE"],
    steps: [
      {
        id: "dml",
        kicker: "Lignes",
        title: "INSERT, UPDATE, DELETE touchent aux données",
        blocks: [
          {
            type: "code",
            title: "Trois ordres à connaître par cœur",
            code: `INSERT INTO classes (id, nom) VALUES (1, 'IG3-A');

UPDATE users
   SET id_language = 2
 WHERE id_user = 10;

DELETE FROM employe;          -- toutes les lignes
DELETE FROM employe WHERE id = 4;  -- une ligne`,
          },
          {
            type: "compare",
            title: "DELETE et TRUNCATE ne sont pas jumeaux",
            bad: "TRUNCATE est un DELETE plus lent, annulable par ROLLBACK.",
            good: "TRUNCATE vide la table tout de suite, ne fire pas les triggers DML, et ne se ROLLBACK pas : c'est du DDL, Oracle valide la transaction.",
            note: "DELETE FROM employe; sans WHERE supprime toutes les lignes, pas la table. La table reste, les triggers DELETE partent, un ROLLBACK peut annuler.",
          },
        ],
      },
      {
        id: "sequence",
        kicker: "Recette",
        title: "Créer une séquence, puis s'en servir",
        blocks: [
          {
            type: "recipe",
            title: "SEQ_EMPLOYES_ID comme dans le sujet",
            items: [
              "CREATE SEQUENCE seq_employes_id",
              "START WITH 1 — première valeur distribuée",
              "INCREMENT BY 1 — pas entre deux NEXTVAL",
              "MAXVALUE 1000000 — plafond demandé",
              "CYCLE — après le plafond, on repart de MINVALUE (1 par défaut)",
              "Dans l'INSERT : seq_employes_id.NEXTVAL",
            ],
          },
          {
            type: "code",
            code: `CREATE SEQUENCE seq_employes_id
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 1000000
  CYCLE;

INSERT INTO employees (id, nom, prenom, date_embauche, salaire)
VALUES (seq_employes_id.NEXTVAL, 'DOSSOU', 'Afi', DATE '2024-10-01', 40000);`,
            caption: "CYCLE sans MAXVALUE est refusé. NEXTVAL avance, CURRVAL relit la dernière valeur de ta session (impossible avant le premier NEXTVAL).",
          },
          {
            type: "code",
            title: "Identifiants M100, M110, M120",
            code: `CREATE SEQUENCE seq_matiere START WITH 100 INCREMENT BY 10;

CREATE OR REPLACE TRIGGER trg_bi_matiere
BEFORE INSERT ON matieres
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := 'M' || seq_matiere.NEXTVAL;
  END IF;
END;
/`,
            caption: "La colonne id est alors un VARCHAR2, pas un NUMBER.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "lignes-1",
        points: 1,
        prompt: "Que fait DELETE FROM employe; ?",
        choices: [
          { id: "a", text: "Supprime la table employe" },
          { id: "b", text: "Supprime toutes les lignes de employe" },
          { id: "c", text: "Supprime seulement les lignes qui vérifient une condition, donc rien ici" },
          { id: "d", text: "Supprime la table et ses contraintes" },
        ],
        answer: "b",
        why: "Sans WHERE, toutes les lignes partent. La table, elle, reste. Pour supprimer l'objet : DROP TABLE.",
      },
      {
        kind: "mcq",
        id: "lignes-2",
        points: 1,
        prompt: "Différence principale entre DELETE et TRUNCATE dans Oracle ?",
        choices: [
          { id: "a", text: "DELETE est plus rapide que TRUNCATE" },
          { id: "b", text: "TRUNCATE déclenche les triggers de ligne" },
          { id: "c", text: "TRUNCATE ne peut pas être annulé par ROLLBACK" },
          { id: "d", text: "DELETE supprime les colonnes au lieu des lignes" },
        ],
        answer: "c",
        why: "TRUNCATE est du DDL : commit implicite. Il est plus rapide et ne fire pas les triggers DML.",
      },
      {
        kind: "mcq",
        id: "lignes-3",
        points: 1,
        prompt: "Séquence qui doit produire M100 puis M110. Quel pas ?",
        choices: [
          { id: "a", text: "START WITH 100 INCREMENT BY 10, puis 'M' || NEXTVAL" },
          { id: "b", text: "START WITH 1 INCREMENT BY 1, Oracle ajoute le M tout seul" },
          { id: "c", text: "START WITH M100 — une séquence accepte des lettres" },
          { id: "d", text: "INCREMENT BY 100 seulement" },
        ],
        answer: "a",
        why: "Une séquence ne sort que des nombres. Le préfixe M se colle dans le trigger ou dans l'INSERT.",
      },
    ],
  },
  {
    id: "requetes",
    index: 5,
    title: "Interroger comme à l'examen",
    promise: "JOIN, agrégats, DISTINCT, FETCH FIRST, TRUNC, NVL.",
    minutes: 22,
    skills: ["SELECT", "JOIN", "GROUP BY", "TRUNC"],
    steps: [
      {
        id: "select",
        kicker: "Lecture",
        title: "Le SELECT qui revient dans chaque bloc",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Dans un bloc PL/SQL tu ne « affiches » pas un SELECT tout nu. Soit tu ranges le résultat dans une variable avec `SELECT … INTO`, soit tu parcours plusieurs lignes avec un **curseur FOR**.",
              "Une requête qui doit ramener **une** valeur (un COUNT, une moyenne) va dans `INTO`. Plusieurs lignes : boucle.",
            ],
          },
          {
            type: "code",
            title: "Les formes des annales",
            code: `-- une seule valeur
SELECT COUNT(*) INTO v_total
  FROM contents
 WHERE id_language = v_id_language
   AND status = 'Validé';

-- zéro ou plusieurs lignes
FOR rec IN (
  SELECT titre, date_creation
    FROM contenu
   ORDER BY date_creation DESC
   FETCH FIRST 5 ROWS ONLY
) LOOP
  DBMS_OUTPUT.PUT_LINE(rec.titre);
END LOOP;`,
          },
        ],
      },
      {
        id: "fonctions",
        kicker: "Fonctions SQL",
        title: "TRUNC, ROUND, NVL, DISTINCT, FETCH",
        blocks: [
          {
            type: "table",
            title: "TRUNC retire, ROUND décide",
            columns: ["Expression", "Résultat"],
            rows: [
              ["TRUNC(15.9)", "15"],
              ["TRUNC(15.789, 2)", "15.78"],
              ["TRUNC(-15.9)", "-15"],
              ["ROUND(15.9)", "16"],
              ["TRUNC(SYSDATE)", "aujourd'hui à 00:00:00"],
            ],
          },
          {
            type: "callout",
            tone: "exam",
            title: "La phrase du cours sur TRUNC",
            body: "TRUNC ne fabrique jamais de décimales. S'il y en a, il les coupe. Il n'arrondit pas. Ne le confonds pas avec ROUND, ni avec TRUNCATE TABLE.",
          },
          {
            type: "prose",
            paragraphs: [
              "**DISTINCT** filtre l'affichage, il ne supprime rien dans la table. `SELECT DISTINCT id_langue FROM utilisateur` donne les langues présentes, sans doublon, sans tri.",
              "Les N premières lignes, en Oracle 12c et après : `FETCH FIRST 5 ROWS ONLY`. `LIMIT` est MySQL, `TOP` est SQL Server.",
              "**NVL(expr, 0)** remplace NULL par 0. Utile sur une moyenne de commentaires quand personne n'a noté. **UPPER / LOWER** servent aux comparaisons de statut : `LOWER(statut) = 'valide'`.",
            ],
          },
        ],
      },
      {
        id: "jointures",
        kicker: "Compter juste",
        title: "INNER JOIN oublie les zéros, LEFT JOIN les garde",
        blocks: [
          {
            type: "compare",
            title: "Nombre de commentaires par contenu",
            bad: `SELECT c.title, COUNT(cm.id_comment)
  FROM contents c
  JOIN comments cm ON cm.id_content = c.id_content
 GROUP BY c.title;`,
            good: `SELECT c.id_content, c.title, COUNT(cm.id_comment) AS nb
  FROM contents c
  LEFT JOIN comments cm ON cm.id_content = c.id_content
 GROUP BY c.id_content, c.title;`,
            note: "Le JOIN interne efface les contenus sans commentaire. Le LEFT JOIN les garde, et COUNT sur la colonne de droite vaut 0. Groupe par la clé, pas seulement par le titre : deux contenus peuvent partager un titre.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "req-1",
        points: 1,
        prompt: "Quel mot-clé récupère les N premières lignes dans Oracle ?",
        choices: [
          { id: "a", text: "LIMIT" },
          { id: "b", text: "TOP" },
          { id: "c", text: "FETCH FIRST N ROWS ONLY" },
          { id: "d", text: "ROW_NUMBER" },
        ],
        answer: "c",
        why: "LIMIT et TOP sont d'autres SGBD. ROW_NUMBER est une fonction de fenêtrage, pas le mot-clé demandé au QCM.",
      },
      {
        kind: "mcq",
        id: "req-2",
        points: 1,
        prompt: "Que vaut TRUNC(15.9) ?",
        choices: [
          { id: "a", text: "16" },
          { id: "b", text: "15" },
          { id: "c", text: "15.9" },
          { id: "d", text: "15,90 avec une virgule française" },
        ],
        answer: "b",
        why: "TRUNC coupe la partie décimale. ROUND(15.9) aurait donné 16.",
      },
      {
        kind: "mcq",
        id: "req-3",
        points: 1,
        prompt: "SELECT DISTINCT id_langue FROM utilisateur ;",
        choices: [
          { id: "a", text: "Trie les langues par nom et supprime les lignes dans la table" },
          { id: "b", text: "Affiche les id_langue sans doublon" },
          { id: "c", text: "Supprime les utilisateurs sans langue" },
          { id: "d", text: "Compte les langues" },
        ],
        answer: "b",
        why: "DISTINCT n'efface rien et ne trie pas. Il n'y a pas de ORDER BY ni de COUNT.",
      },
    ],
  },
  {
    id: "vues",
    index: 6,
    title: "Créer une vue",
    promise: "Une requête nommée, avec les agrégats justes.",
    minutes: 14,
    skills: ["CREATE VIEW", "GROUP BY", "HAVING"],
    steps: [
      {
        id: "quoi",
        kicker: "Idée",
        title: "Une vue ne stocke pas les lignes",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Une vue est une requête à laquelle tu donnes un nom. À chaque lecture, Oracle réexécute le SELECT. Tu t'en sers quand le sujet dit « afficher pour chaque… » **sans** paramètre, ou « créer une vue ».",
              "S'il y a un paramètre (`p_id_langue`), ce n'est plus une vue : c'est une **fonction**. Une vue n'a pas de parenthèses.",
            ],
          },
          {
            type: "recipe",
            title: "Vue_Contents, version rattrapage",
            items: [
              "CREATE OR REPLACE VIEW vue_contents AS",
              "SELECT le titre, le nom du type, COUNT des commentaires.",
              "FROM contents JOIN types_contents, LEFT JOIN comments.",
              "GROUP BY la clé du contenu, le titre et le nom du type.",
              "Pas de ORDER BY obligatoire. Pas de point-virgule au milieu du SELECT.",
            ],
          },
          {
            type: "code",
            code: `CREATE OR REPLACE VIEW vue_contents AS
SELECT c.title,
       t.name AS type_contenu,
       COUNT(cm.id_comment) AS nb_commentaires
  FROM contents c
  JOIN types_contents t
    ON t.id_type_content = c.id_type_content
  LEFT JOIN comments cm
    ON cm.id_content = c.id_content
 GROUP BY c.id_content, c.title, t.name;`,
          },
        ],
      },
      {
        id: "auteurs",
        kicker: "Variante du 2 heures",
        title: "« Ayant publié au moins un contenu »",
        blocks: [
          {
            type: "code",
            title: "Vue_AuteursActifs",
            code: `CREATE OR REPLACE VIEW vue_auteursactifs AS
SELECT u.nom,
       u.prenom,
       COUNT(c.id_contenu) AS nb_contenus
  FROM utilisateur u
  JOIN contenu c
    ON c.id_auteur = u.id_utilisateur
 WHERE LOWER(c.statut) = 'publié'
 GROUP BY u.id_utilisateur, u.nom, u.prenom;`,
            caption: "Le JOIN interne suffit pour « au moins un ». HAVING COUNT(*) >= 1 est redondant. Le WHERE filtre le statut avant l'agrégat.",
          },
          {
            type: "callout",
            tone: "trap",
            title: "WHERE et HAVING",
            body: "WHERE filtre les lignes avant COUNT. HAVING filtre les groupes après. « Contenus publiés » se met dans WHERE. « Auteurs dont le nombre dépasse 3 » se met dans HAVING.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "vues-1",
        points: 1,
        prompt: "Le sujet demande le nombre de médias de chaque type, sans paramètre. Tu crées…",
        choices: [
          { id: "a", text: "Une fonction NbMedia(p_type)" },
          { id: "b", text: "Une vue avec GROUP BY type_media" },
          { id: "c", text: "Un trigger AFTER SELECT" },
          { id: "d", text: "Une séquence" },
        ],
        answer: "b",
        why: "Pas de paramètre, un résultat tabulaire : vue. AFTER SELECT n'existe pas.",
      },
      {
        kind: "mcq",
        id: "vues-2",
        points: 1,
        prompt: "Pour garder les contenus qui ont 0 commentaire dans le comptage, quelle jointure ?",
        choices: [
          { id: "a", text: "JOIN (interne) sur comments" },
          { id: "b", text: "LEFT JOIN comments, et COUNT sur la clé du commentaire" },
          { id: "c", text: "CROSS JOIN" },
          { id: "d", text: "UNION ALL" },
        ],
        answer: "b",
        why: "LEFT JOIN conserve la ligne de gauche. COUNT(colonne de droite) ignore les NULL, donc donne 0.",
      },
      {
        kind: "mcq",
        id: "vues-3",
        points: 1,
        prompt: "CREATE OR REPLACE VIEW sert à…",
        choices: [
          { id: "a", text: "Recréer la vue sans l'erreur « name already used »" },
          { id: "b", text: "Vider les données de la vue" },
          { id: "c", text: "Remplacer une table physique" },
          { id: "d", text: "Donner les droits DBA" },
        ],
        answer: "a",
        why: "OR REPLACE recompile l'objet. Les données restent dans les tables, pas dans la vue.",
      },
    ],
  },
  {
    id: "blocs",
    index: 7,
    title: "Bloc PL/SQL et variables",
    promise: "Déclarer juste, et reconnaître une déclaration fausse.",
    minutes: 20,
    skills: ["DECLARE", "BOOLEAN", "%TYPE", "RECORD"],
    steps: [
      {
        id: "bloc",
        kicker: "Anatomie",
        title: "Quatre zones, pas une de plus",
        blocks: [
          {
            type: "code",
            title: "Bloc anonyme",
            code: `DECLARE
  v_count NUMBER := 0;
  v_nom   VARCHAR2(50);
BEGIN
  SELECT COUNT(*) INTO v_count FROM langue;
  DBMS_OUTPUT.PUT_LINE(v_count);
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;
/`,
          },
          {
            type: "prose",
            paragraphs: [
              "`DECLARE` est facultatif s'il n'y a aucune variable. `BEGIN` et `END` sont obligatoires. `EXCEPTION` est facultatif, mais c'est **la** section des erreurs — pas `CATCH`, pas `TRY`.",
              "Chaque variable a **sa** ligne. On n'écrit pas `v_x, v_y VARCHAR2(10)`.",
            ],
          },
        ],
      },
      {
        id: "pieges",
        kicker: "Les six du rattrapage",
        title: "Correct, incorrect, et pourquoi",
        blocks: [
          {
            type: "table",
            columns: ["Déclaration", "Verdict", "Pourquoi"],
            rows: [
              ["v_id NUMBER(4);", "Correcte", "Précision 4, échelle 0. Rien d'autre n'est exigé."],
              ["v_x, v_y, v_z VARCHAR2(10);", "Fausse", "Une variable par instruction."],
              ["v_date_naissance DATE NOT NULL;", "Fausse", "NOT NULL oblige une initialisation."],
              ["v_en_stock BOOLEAN := 1;", "Fausse", "BOOLEAN vaut TRUE, FALSE ou NULL. Pas 1."],
              ["emp_record emp_record_type;", "Correcte", "Si le type existe déjà (record ou %ROWTYPE)."],
              ["TYPE t IS TABLE OF VARCHAR2(20) INDEX BY BINARY_INTEGER;", "Correcte", "Tableau associatif. BINARY_INTEGER est accepté."],
            ],
          },
          {
            type: "compare",
            title: "NOT NULL et BOOLEAN",
            bad: `v_date_naissance DATE NOT NULL;
v_ok BOOLEAN := 1;`,
            good: `v_date_naissance DATE NOT NULL := DATE '2002-05-14';
v_ok BOOLEAN := TRUE;`,
            note: "Sans `:=`, un NOT NULL ne compile pas (PLS-00218). 1 est un nombre, TRUE est un booléen.",
          },
        ],
      },
      {
        id: "ancrage",
        kicker: "Habitude de copie",
        title: "%TYPE, %ROWTYPE, RECORD",
        blocks: [
          {
            type: "code",
            code: `DECLARE
  v_nom   utilisateur.nom%TYPE;
  v_user  utilisateur%ROWTYPE;
  TYPE t_pair IS RECORD (
    nom    VARCHAR2(50),
    total  NUMBER
  );
  v_pair t_pair;
BEGIN
  SELECT * INTO v_user FROM utilisateur WHERE id_utilisateur = 1;
END;
/`,
            caption: "SELECT * INTO … %ROWTYPE échoue avec TOO_MANY_ROWS si plusieurs lignes reviennent, et NO_DATA_FOUND si aucune.",
          },
          {
            type: "callout",
            tone: "tip",
            title: "Pourquoi %TYPE sur la copie",
            body: "Si le correcteur a déclaré NOM en VARCHAR2(50) et que tu répètes VARCHAR2(30), tu peux tronquer. %TYPE suit la colonne. C'est plus court et plus solide.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "blocs-1",
        points: 1,
        prompt: "Laquelle est une déclaration PL/SQL correcte ?",
        choices: [
          { id: "a", text: "v_x, v_y VARCHAR2(10);" },
          { id: "b", text: "v_flag BOOLEAN := 1;" },
          { id: "c", text: "v_id NUMBER(4);" },
          { id: "d", text: "v_d DATE NOT NULL;" },
        ],
        answer: "c",
        why: "A déclare plusieurs variables d'un coup, B met un nombre dans un BOOLEAN, D est NOT NULL sans valeur.",
      },
      {
        kind: "mcq",
        id: "blocs-2",
        points: 1,
        prompt: "Quelle section gère les exceptions dans une procédure ?",
        choices: [
          { id: "a", text: "CATCH" },
          { id: "b", text: "TRY" },
          { id: "c", text: "EXCEPTION" },
          { id: "d", text: "WHEN seulement, sans section" },
        ],
        answer: "c",
        why: "WHEN s'écrit à l'intérieur de EXCEPTION. CATCH et TRY n'existent pas en PL/SQL.",
      },
      {
        kind: "mcq",
        id: "blocs-3",
        points: 1,
        prompt: "INDEX BY BINARY_INTEGER décrit…",
        choices: [
          { id: "a", text: "Une clé primaire" },
          { id: "b", text: "Un tableau associatif PL/SQL" },
          { id: "c", text: "Un index SQL créé par CREATE INDEX" },
          { id: "d", text: "Une erreur de syntaxe systématique" },
        ],
        answer: "b",
        why: "TYPE … IS TABLE OF … INDEX BY … est un tableau indexé, en mémoire, dans le bloc. Ce n'est pas un index de table.",
      },
    ],
  },
  {
    id: "controle",
    index: 8,
    title: "IF, boucles, curseurs",
    promise: "Répéter un nombre de fois, ou une fois par ligne.",
    minutes: 16,
    skills: ["IF", "FOR", "WHILE", "curseur"],
    steps: [
      {
        id: "if",
        kicker: "Décider",
        title: "IF n'a pas de parenthèses obligatoires",
        blocks: [
          {
            type: "code",
            code: `IF v_count > 0 THEN
  DBMS_OUTPUT.PUT_LINE('Déjà là');
ELSIF v_count = 0 THEN
  INSERT INTO langue (id_langue, nom_langue) VALUES (seq_langue.NEXTVAL, 'Fon');
ELSE
  DBMS_OUTPUT.PUT_LINE('Cas inattendu');
END IF;`,
            caption: "C'est ELSIF, pas ELSE IF. END IF en deux mots.",
          },
        ],
      },
      {
        id: "boucles",
        kicker: "Répéter",
        title: "FOR quand tu connais le nombre",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Le QCM demande : « boucler un nombre précis de fois ». La réponse est **FOR**, parce que les bornes sont écrites. WHILE dépend d'une condition. LOOP tout seul boucle jusqu'à un EXIT. Il n'y a pas de REPEAT.",
            ],
          },
          {
            type: "code",
            code: `-- exactement 5 tours
FOR i IN 1 .. 5 LOOP
  DBMS_OUTPUT.PUT_LINE(i);
END LOOP;

-- une fois par ligne : le curseur FOR des annales
FOR rec IN (
  SELECT nom_region
    FROM region
   WHERE id_region NOT IN (SELECT id_region FROM contenu WHERE id_region IS NOT NULL)
) LOOP
  DBMS_OUTPUT.PUT_LINE('Région sans contenu : ' || rec.nom_region);
END LOOP;`,
          },
          {
            type: "callout",
            tone: "tip",
            title: "DBMS_OUTPUT",
            body: "PUT_LINE n'affiche quelque chose que si le client a activé SERVEROUTPUT (SET SERVEROUTPUT ON dans SQL*Plus). Sur une copie, tu l'écris quand même : c'est la façon demandée d'« afficher ».",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "ctl-1",
        points: 1,
        prompt: "Quelle instruction PL/SQL boucle un nombre précis de fois ?",
        choices: [
          { id: "a", text: "WHILE" },
          { id: "b", text: "FOR" },
          { id: "c", text: "LOOP" },
          { id: "d", text: "REPEAT" },
        ],
        answer: "b",
        why: "FOR i IN 1..n fixe le nombre de tours. REPEAT n'existe pas.",
      },
      {
        kind: "mcq",
        id: "ctl-2",
        points: 1,
        prompt: "Tu dois afficher une ligne par contenu. La forme la plus courte attendue est…",
        choices: [
          { id: "a", text: "SELECT INTO une seule variable titre" },
          { id: "b", text: "FOR rec IN (SELECT …) LOOP … END LOOP" },
          { id: "c", text: "GOTO ligne_suivante" },
          { id: "d", text: "TRUNCATE puis INSERT" },
        ],
        answer: "b",
        why: "SELECT INTO ne convient qu'à une seule ligne. Le curseur FOR est le standard des corrigés du cours.",
      },
      {
        kind: "mcq",
        id: "ctl-3",
        points: 1,
        prompt: "Comment écrit-on le « sinon si » ?",
        choices: [
          { id: "a", text: "ELSE IF" },
          { id: "b", text: "ELSIF" },
          { id: "c", text: "ELSEIF" },
          { id: "d", text: "CASE IF" },
        ],
        answer: "b",
        why: "PL/SQL colle les deux mots : ELSIF. ELSE IF ne compile pas.",
      },
    ],
  },
  {
    id: "exceptions",
    index: 9,
    title: "Erreurs et annulation",
    promise: "Lever une erreur utile, et savoir ce qu'un trigger bloque.",
    minutes: 14,
    skills: ["EXCEPTION", "RAISE_APPLICATION_ERROR", "SQL%ROWCOUNT"],
    steps: [
      {
        id: "lever",
        kicker: "Recette",
        title: "RAISE_APPLICATION_ERROR pour une règle métier",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Quand le sujet dit « la fonction retourne une erreur » ou « la procédure lève une exception avec un message », tu n'écris pas `RETURN 'erreur'`. Tu **interromps** le bloc.",
              "Le numéro doit être entre **-20000 et -20999**. Le message est une chaîne. Après le RAISE, rien en dessous ne s'exécute.",
            ],
          },
          {
            type: "code",
            code: `IF salaire_mensuel IS NULL OR salaire_mensuel <= 0 THEN
  RAISE_APPLICATION_ERROR(-20001,
    'Le salaire mensuel doit être strictement positif.');
END IF;`,
          },
        ],
      },
      {
        id: "effet",
        kicker: "Effet",
        title: "Une exception non gérée annule l'ordre",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Si un trigger `BEFORE INSERT` lève une exception que personne n'attrape, **l'insertion est annulée**. Le trigger n'est pas « ignoré ». Oracle ne range pas l'erreur dans une table système à ta place.",
              "Pour un UPDATE qui ne trouve personne, `SQL%ROWCOUNT` vaut 0 juste après l'ordre. C'est le moment de lever « introuvable ».",
            ],
          },
          {
            type: "code",
            code: `UPDATE users
   SET id_language = v_id_language
 WHERE id_user = v_id_user;

IF SQL%ROWCOUNT = 0 THEN
  RAISE_APPLICATION_ERROR(-20011, 'Utilisateur introuvable.');
END IF;`,
          },
          {
            type: "callout",
            tone: "trap",
            title: "NO_DATA_FOUND est silencieux si tu l'avales mal",
            body: "Un SELECT INTO sans ligne lève NO_DATA_FOUND. Si ton EXCEPTION WHEN OTHERS THEN NULL; l'avale, le bug disparaît et la copie a l'air de marcher. N'avale pas OTHERS sans relancer.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "exc-1",
        points: 1,
        prompt: "Un trigger BEFORE INSERT lève une exception non gérée. Que se passe-t-il ?",
        choices: [
          { id: "a", text: "L'insertion est annulée" },
          { id: "b", text: "Le trigger est ignoré et la ligne est insérée" },
          { id: "c", text: "L'insertion est faite à moitié" },
          { id: "d", text: "L'exception est stockée dans une table système et la ligne reste" },
        ],
        answer: "a",
        why: "L'exception remonte, l'ordre INSERT est défait. C'est précisément pour ça qu'on met les interdictions dans un BEFORE.",
      },
      {
        kind: "mcq",
        id: "exc-2",
        points: 1,
        prompt: "Quel appel respecte la plage des erreurs applicatives ?",
        choices: [
          { id: "a", text: "RAISE_APPLICATION_ERROR(20001, 'non')" },
          { id: "b", text: "RAISE_APPLICATION_ERROR(-20001, 'non')" },
          { id: "c", text: "THROW NEW ERROR(-1)" },
          { id: "d", text: "RETURN -20001" },
        ],
        answer: "b",
        why: "Le code doit être négatif, entre -20000 et -20999. RETURN ne lève pas une erreur Oracle.",
      },
      {
        kind: "mcq",
        id: "exc-3",
        points: 1,
        prompt: "Juste après un UPDATE, SQL%ROWCOUNT vaut 0. Cela veut dire…",
        choices: [
          { id: "a", text: "La table n'existe pas" },
          { id: "b", text: "Aucune ligne ne correspondait au WHERE" },
          { id: "c", text: "Le trigger a tout annulé" },
          { id: "d", text: "Il faut un COMMIT pour que le chiffre apparaisse" },
        ],
        answer: "b",
        why: "ROWCOUNT compte les lignes touchées par le dernier ordre SQL du bloc. 0 = le WHERE n'a rien trouvé.",
      },
    ],
  },
  {
    id: "fonctions",
    index: 10,
    title: "Créer une fonction",
    promise: "Un nom, des paramètres, un RETURN, un seul nombre.",
    minutes: 16,
    skills: ["FUNCTION", "RETURN", "SELECT INTO"],
    steps: [
      {
        id: "forme",
        kicker: "Recette",
        title: "La fonction des sujets « nombre de… »",
        blocks: [
          {
            type: "recipe",
            title: "À chaque fois",
            items: [
              "CREATE OR REPLACE FUNCTION nom_du_sujet",
              "Paramètre IN, typé avec %TYPE si tu connais la colonne.",
              "RETURN NUMBER juste après la parenthèse fermante, avant IS.",
              "Variable locale pour le COUNT.",
              "SELECT COUNT(*) INTO variable FROM … WHERE …",
              "RETURN variable; puis END;",
            ],
          },
          {
            type: "code",
            title: "NbContentsByLanguage",
            code: `CREATE OR REPLACE FUNCTION nbcontentsbylanguage (
  v_id_language IN languages.id_language%TYPE
) RETURN NUMBER
IS
  v_total NUMBER;
BEGIN
  SELECT COUNT(*)
    INTO v_total
    FROM contents
   WHERE id_language = v_id_language
     AND status = 'Validé';
  RETURN v_total;
END;
/

-- essai
SELECT nbcontentsbylanguage(1) FROM dual;`,
          },
          {
            type: "callout",
            tone: "exam",
            title: "Qui retourne une valeur scalaire ?",
            body: "La fonction. Une procédure ne RETURN pas de valeur (elle peut avoir un paramètre OUT, mais le QCM attend « fonction »). Un trigger ne se rappelle pas pour obtenir un nombre. Un package est un conteneur, pas une valeur.",
          },
        ],
      },
      {
        id: "salaire",
        kicker: "Variante",
        title: "Calcul + validation",
        blocks: [
          {
            type: "code",
            title: "CALCULER_SALAIRE_ANNUEL",
            code: `CREATE OR REPLACE FUNCTION calculer_salaire_annuel (
  salaire_mensuel IN NUMBER
) RETURN NUMBER
IS
BEGIN
  IF salaire_mensuel IS NULL OR salaire_mensuel <= 0 THEN
    RAISE_APPLICATION_ERROR(-20001,
      'Salaire mensuel invalide.');
  END IF;
  RETURN salaire_mensuel * 12;
END;
/`,
            caption: "Le RETURN du nombre vient après le test. Si tu RETURN avant le IF, la validation ne sert à rien.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "fn-1",
        points: 1,
        prompt: "Quel objet PL/SQL retourne une seule valeur scalaire ?",
        choices: [
          { id: "a", text: "Une procédure" },
          { id: "b", text: "Une fonction" },
          { id: "c", text: "Un trigger" },
          { id: "d", text: "Un package" },
        ],
        answer: "b",
        why: "Question 8 du QCM. Seule la fonction est faite pour être utilisée comme une valeur.",
      },
      {
        kind: "mcq",
        id: "fn-2",
        points: 1,
        prompt: "Où s'écrit le type renvoyé ?",
        choices: [
          { id: "a", text: "RETURN NUMBER entre la liste des paramètres et IS" },
          { id: "b", text: "Dans le nom de la fonction" },
          { id: "c", text: "RETURNS TABLE, comme en SQL Server" },
          { id: "d", text: "Il n'y a pas de type, Oracle devine" },
        ],
        answer: "a",
        why: "La signature Oracle est FUNCTION nom(params) RETURN type IS. Pas RETURNS.",
      },
      {
        kind: "mcq",
        id: "fn-3",
        points: 1,
        prompt: "COUNT(*) dans une fonction se récupère avec…",
        choices: [
          { id: "a", text: "SELECT COUNT(*) INTO v_total FROM …" },
          { id: "b", text: "v_total := COUNT(*) FROM …" },
          { id: "c", text: "RETURN SELECT COUNT(*)" },
          { id: "d", text: "DBMS_OUTPUT.GET_LINE" },
        ],
        answer: "a",
        why: "Une requête SQL dans PL/SQL qui produit une valeur passe par SELECT … INTO.",
      },
    ],
  },
  {
    id: "procedures",
    index: 11,
    title: "Créer une procédure",
    promise: "Changer des données, confirmer, refuser un cas interdit.",
    minutes: 16,
    skills: ["PROCEDURE", "IN", "UPDATE", "INSERT"],
    steps: [
      {
        id: "forme",
        kicker: "Différence",
        title: "La procédure agit, elle ne « vaut » pas un nombre",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Tu choisis une procédure quand le sujet dit **mettre à jour**, **insérer**, **supprimer**, **changer le statut**. Il n'y a pas de `RETURN type` dans la signature. L'appel se fait dans un bloc : `BEGIN changerlangueutilisateur(3, 2); END;`",
            ],
          },
          {
            type: "code",
            title: "ChangerLangueUtilisateur",
            code: `CREATE OR REPLACE PROCEDURE changerlangueutilisateur (
  v_id_user     IN users.id_user%TYPE,
  v_id_language IN languages.id_language%TYPE
) IS
BEGIN
  UPDATE users
     SET id_language = v_id_language
   WHERE id_user = v_id_user;

  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20011, 'Utilisateur introuvable.');
  END IF;
END;
/`,
          },
        ],
      },
      {
        id: "insert",
        kicker: "Recette",
        title: "Insérer avec une séquence et confirmer",
        blocks: [
          {
            type: "code",
            title: "AJOUTER_EMPLOYE",
            code: `CREATE OR REPLACE PROCEDURE ajouter_employe (
  p_nom            IN employees.nom%TYPE,
  p_prenom         IN employees.prenom%TYPE,
  p_date_embauche  IN employees.date_embauche%TYPE,
  p_salaire        IN employees.salaire%TYPE
) IS
  v_id employees.id%TYPE;
BEGIN
  v_id := seq_employes_id.NEXTVAL;
  INSERT INTO employees (id, nom, prenom, date_embauche, salaire)
  VALUES (v_id, p_nom, p_prenom, p_date_embauche, p_salaire);
  DBMS_OUTPUT.PUT_LINE('Employé inséré, ID ' || v_id);
END;
/`,
          },
          {
            type: "code",
            title: "MISE_A_JOUR_SALAIRE — le refus sous 33500",
            code: `CREATE OR REPLACE PROCEDURE mise_a_jour_salaire (
  p_id              IN employees.id%TYPE,
  p_nouveau_salaire IN NUMBER
) IS
BEGIN
  IF p_nouveau_salaire < 33500 THEN
    RAISE_APPLICATION_ERROR(-20002,
      'Le salaire ne peut pas être inférieur à 33500.');
  END IF;

  UPDATE employees
     SET salaire = p_nouveau_salaire
   WHERE id = p_id;

  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20003, 'Employé introuvable.');
  END IF;
END;
/

BEGIN
  mise_a_jour_salaire(1, 40000);
END;
/`,
            caption: "Le test vient avant l'UPDATE. Sinon la ligne interdite est écrite, puis l'erreur arrive trop tard si un autre code a déjà COMMIT.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "pr-1",
        points: 1,
        prompt: "« Met à jour la langue préférée ». Fonction ou procédure ?",
        choices: [
          { id: "a", text: "Fonction, parce qu'il y a deux paramètres" },
          { id: "b", text: "Procédure : on modifie une ligne, on ne retourne pas un scalaire" },
          { id: "c", text: "Trigger, parce que toute mise à jour est un trigger" },
          { id: "d", text: "Vue" },
        ],
        answer: "b",
        why: "Le sujet ne demande pas une valeur de retour. Il demande une action. C'est la définition d'une procédure dans ces copies.",
      },
      {
        kind: "mcq",
        id: "pr-2",
        points: 1,
        prompt: "Où places-tu le test « salaire < 33500 » ?",
        choices: [
          { id: "a", text: "Après le END, dans un autre script" },
          { id: "b", text: "Avant l'UPDATE, avec RAISE_APPLICATION_ERROR" },
          { id: "c", text: "Dans un commentaire, Oracle lit les commentaires" },
          { id: "d", text: "Dans le nom de la procédure" },
        ],
        answer: "b",
        why: "La règle doit empêcher l'écriture. RAISE avant l'UPDATE garantit que la ligne ne change pas.",
      },
      {
        kind: "mcq",
        id: "pr-3",
        points: 1,
        prompt: "Comment appelle-t-on une procédure sans paramètre OUT ?",
        choices: [
          { id: "a", text: "SELECT ajouter_employe(...) FROM dual;" },
          { id: "b", text: "BEGIN ajouter_employe('A', 'B', SYSDATE, 40000); END;" },
          { id: "c", text: "CALL VIEW ajouter_employe" },
          { id: "d", text: "EXECUTE IMMEDIATE seulement, sinon interdit" },
        ],
        answer: "b",
        why: "Une procédure s'appelle comme une instruction, dans un bloc. SELECT FROM dual est réservé aux fonctions.",
      },
    ],
  },
  {
    id: "triggers",
    index: 12,
    title: "Créer un déclencheur",
    promise: "BEFORE pour interdire ou remplir :NEW, AFTER pour écrire ailleurs.",
    minutes: 20,
    skills: ["TRIGGER", ":NEW", ":OLD", "FOR EACH ROW"],
    steps: [
      {
        id: "anatomie",
        kicker: "Anatomie",
        title: "Quatre choix, puis le corps",
        blocks: [
          {
            type: "recipe",
            title: "Avant d'écrire le BEGIN",
            items: [
              "Moment : BEFORE (tu peux encore changer :NEW, ou refuser) ou AFTER (la ligne est déjà posée).",
              "Événement : INSERT, UPDATE, DELETE, ou plusieurs avec OR.",
              "Table : ON nom_table.",
              "Grain : FOR EACH ROW si tu lis :NEW ou :OLD. Sans cette clause, :NEW n'existe pas.",
              "Corps : IF + RAISE pour interdire, ou affectation :NEW.colonne := … pour remplir.",
            ],
          },
          {
            type: "code",
            title: "Interdire un commentaire hors barème",
            code: `CREATE OR REPLACE TRIGGER trg_bloquercomment
BEFORE INSERT ON comments
FOR EACH ROW
BEGIN
  IF :NEW.note IS NULL OR :NEW.note < 0 OR :NEW.note > 5 THEN
    RAISE_APPLICATION_ERROR(-20010,
      'La note doit être comprise entre 0 et 5.');
  END IF;
END;
/`,
          },
        ],
      },
      {
        id: "deux-cas",
        kicker: "Deux modèles d'annales",
        title: "Remplir une date, ou créer les lignes filles",
        blocks: [
          {
            type: "code",
            title: "date_validation quand le statut passe à validé",
            code: `CREATE OR REPLACE TRIGGER trg_date_validation
BEFORE UPDATE OF statut ON contenu
FOR EACH ROW
BEGIN
  IF LOWER(:NEW.statut) = 'validé'
     AND NVL(LOWER(:OLD.statut), '?') <> 'validé' THEN
    :NEW.date_validation := SYSDATE;
  END IF;
END;
/`,
            caption: "BEFORE, pas AFTER : après l'UPDATE, modifier :NEW ne change plus la ligne. OF statut évite de réagir à un autre champ.",
          },
          {
            type: "code",
            title: "Après un étudiant, une note 0 par matière",
            code: `CREATE OR REPLACE TRIGGER trg_init_notes
AFTER INSERT ON etudiants
FOR EACH ROW
BEGIN
  INSERT INTO obtenir (etudiant_id, matiere_id, note)
  SELECT :NEW.id, m.id, 0 FROM matieres m;
END;
/`,
            caption: "AFTER INSERT : la ligne étudiant existe déjà, la FK d'obtenir peut la référencer. On lit une autre table (matieres), donc pas de table mutante.",
          },
          {
            type: "callout",
            tone: "trap",
            title: "ORA-04091, table mutante",
            body: "Dans un trigger FOR EACH ROW, ne fais pas SELECT sur la table qui déclenche le trigger. Lire `contenu` depuis un trigger sur `commentaire` est permis. Lire `etudiants` depuis un trigger sur `etudiants` ne l'est pas.",
          },
        ],
      },
      {
        id: "statut-contenu",
        kicker: "Sujet à deux conditions",
        title: "Note hors barème, ou contenu non valide",
        blocks: [
          {
            type: "code",
            code: `CREATE OR REPLACE TRIGGER trg_bloquercommentaire
BEFORE INSERT ON commentaire
FOR EACH ROW
DECLARE
  v_statut contenu.statut%TYPE;
BEGIN
  IF :NEW.note IS NULL OR :NEW.note NOT BETWEEN 0 AND 5 THEN
    RAISE_APPLICATION_ERROR(-20021, 'Note hors barème 0..5.');
  END IF;

  SELECT statut INTO v_statut
    FROM contenu
   WHERE id_contenu = :NEW.id_contenu;

  IF LOWER(v_statut) <> 'valide' THEN
    RAISE_APPLICATION_ERROR(-20022, 'Contenu non valide.');
  END IF;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20023, 'Contenu introuvable.');
END;
/`,
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "tg-1",
        points: 1,
        prompt: "Tu veux refuser l'INSERT et tu lis :NEW.note. Quelles clauses ?",
        choices: [
          { id: "a", text: "AFTER INSERT, sans FOR EACH ROW" },
          { id: "b", text: "BEFORE INSERT … FOR EACH ROW" },
          { id: "c", text: "BEFORE SELECT FOR EACH ROW" },
          { id: "d", text: "INSTEAD OF INSERT sur la table" },
        ],
        answer: "b",
        why: "BEFORE pour pouvoir encore bloquer. FOR EACH ROW pour que :NEW existe. Il n'y a pas de trigger BEFORE SELECT sur une table.",
      },
      {
        kind: "mcq",
        id: "tg-2",
        points: 1,
        prompt: "Pour écrire SYSDATE dans date_validation de la ligne en cours d'UPDATE, tu affectes…",
        choices: [
          { id: "a", text: ":OLD.date_validation := SYSDATE dans un AFTER" },
          { id: "b", text: ":NEW.date_validation := SYSDATE dans un BEFORE" },
          { id: "c", text: "NEW.date_validation sans deux-points, dans le corps" },
          { id: "d", text: "Un CHECK (date_validation = SYSDATE)" },
        ],
        answer: "b",
        why: ":NEW est la nouvelle image, modifiable seulement BEFORE. Dans la clause WHEN (hors corps), on écrit NEW sans deux-points. Dans le corps, le deux-points est obligatoire.",
      },
      {
        kind: "mcq",
        id: "tg-3",
        points: 1,
        prompt: "Créer les notes à 0 de toutes les matières juste après l'insertion d'un étudiant. Pourquoi AFTER ?",
        choices: [
          { id: "a", text: "Parce que :NEW n'existe qu'en AFTER" },
          { id: "b", text: "Parce que la ligne parent doit exister pour la FK des notes" },
          { id: "c", text: "Parce que BEFORE interdit INSERT dans le corps" },
          { id: "d", text: "Parce que AFTER ne peut pas lever d'erreur" },
        ],
        answer: "b",
        why: "La clé étrangère d'obtenir pointe vers etudiants. En BEFORE INSERT, cette ligne n'est pas encore là. :NEW existe aussi en BEFORE.",
      },
    ],
  },
  {
    id: "utilisateurs",
    index: 13,
    title: "Utilisateurs, droits, connexion",
    promise: "CREATE USER, GRANT, et ce que « connexion » veut dire sur la copie.",
    minutes: 12,
    skills: ["CREATE USER", "GRANT", "DATABASE LINK"],
    steps: [
      {
        id: "user",
        kicker: "Recette",
        title: "Un compte n'est pas une table",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Le devoir ARI demande un utilisateur `ecole`, un mot de passe, et « les privilèges d'un DBA ». Ça se fait en deux ordres. Créer l'utilisateur ne lui donne **aucun** droit, même pas celui de se connecter.",
            ],
          },
          {
            type: "code",
            title: "Ce que la copie attend souvent",
            code: `CREATE USER ecole IDENTIFIED BY ecole123
  DEFAULT TABLESPACE users
  QUOTA UNLIMITED ON users;

GRANT CONNECT, RESOURCE, DBA TO ecole;`,
            caption: "DBA est très large : le sujet le demande explicitement. Dans un vrai système tu ne le donnerais pas. CONNECT apporte CREATE SESSION, RESOURCE les droits de création d'objets.",
          },
          {
            type: "compare",
            title: "Version plus propre, si le sujet ne dit pas DBA",
            bad: "GRANT DBA TO ecole; -- alors que le sujet demandait seulement de créer des tables",
            good: `GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW,
      CREATE SEQUENCE, CREATE PROCEDURE, CREATE TRIGGER
  TO ecole;`,
            note: "Tu donnes le rôle ou les privilèges **écrits dans le sujet**. Ni plus cachés, ni moins.",
          },
        ],
      },
      {
        id: "lien",
        kicker: "Mot ambigu",
        title: "« Créer une connexion nommée con_ecole »",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Dans SQL Developer, une connexion est un clic, pas un ordre SQL. Sur une copie, le correcteur attend en général un **database link**, ou à défaut l'ordre `CONNECT`.",
              "Écris le database link : c'est du SQL, donc c'est noté. Précise entre parenthèses que le même nom, dans SQL Developer, serait une connexion locale.",
            ],
          },
          {
            type: "code",
            code: `CREATE DATABASE LINK con_ecole
  CONNECT TO ecole IDENTIFIED BY ecole123
  USING 'ORCL';

-- usage : SELECT * FROM classes@con_ecole;`,
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "us-1",
        points: 1,
        prompt: "CREATE USER ecole IDENTIFIED BY ecole123; suffit-il pour qu'il ouvre une session ?",
        choices: [
          { id: "a", text: "Oui, CREATE USER donne tous les droits" },
          { id: "b", text: "Non, il faut au moins GRANT CREATE SESSION, ou un rôle qui le contient" },
          { id: "c", text: "Oui si le mot de passe fait plus de 4 caractères" },
          { id: "d", text: "Non, il faut un trigger de connexion" },
        ],
        answer: "b",
        why: "Un utilisateur neuf ne peut rien faire. CREATE SESSION est le minimum pour se connecter. DBA l'inclut, mais il faut le GRANT.",
      },
      {
        kind: "mcq",
        id: "us-2",
        points: 1,
        prompt: "Le sujet demande les privilèges d'un DBA. Tu écris…",
        choices: [
          { id: "a", text: "GRANT DBA TO ecole" },
          { id: "b", text: "ALTER USER ecole BECOME DBA" },
          { id: "c", text: "CREATE ROLE dba — le rôle système n'existe pas" },
          { id: "d", text: "INSERT INTO dba VALUES ('ecole')" },
        ],
        answer: "a",
        why: "DBA est un rôle déjà fourni par Oracle. On l'accorde, on ne le recrée pas.",
      },
      {
        kind: "mcq",
        id: "us-3",
        points: 1,
        prompt: "Quel ordre SQL crée un lien nommé con_ecole vers le compte ecole ?",
        choices: [
          { id: "a", text: "CREATE CONNECTION con_ecole" },
          { id: "b", text: "CREATE DATABASE LINK con_ecole CONNECT TO ecole IDENTIFIED BY … USING '…'" },
          { id: "c", text: "CREATE SYNONYM con_ecole FOR ecole" },
          { id: "d", text: "ALTER SESSION SET CURRENT_SCHEMA = ecole" },
        ],
        answer: "b",
        why: "CREATE CONNECTION n'existe pas. Un synonyme ne transporte pas un mot de passe distant. Le database link est l'objet nommé.",
      },
    ],
  },
  {
    id: "methode",
    index: 14,
    title: "Assembler une étude de cas",
    promise: "La méthode pour une copie de 2 heures, de la lecture au dernier END.",
    minutes: 18,
    skills: ["méthode", "relecture", "barème"],
    steps: [
      {
        id: "six",
        kicker: "Méthode",
        title: "Six temps, toujours les mêmes",
        blocks: [
          {
            type: "recipe",
            title: "Devant un sujet type ENEAM",
            items: [
              "Recopie le modèle en marge : tables, PK, FK. Souligne chaque nom imposé (vue, trigger, fonction).",
              "Liste les objets à rendre, avec leurs points. Commence par ceux que tu sais faire : souvent le CREATE TABLE et la fonction COUNT.",
              "Écris le squelette vide de chaque objet (CREATE, nom, BEGIN, END) avant le métier. Tu ne perds plus le nom.",
              "Remplis le métier : WHERE du sujet, seuils 0 et 5, statut exact ('Validé', 'valide', 'publié' — copie la casse de l'énoncé).",
              "Ajoute le refus : IF + RAISE, et SQL%ROWCOUNT si on met à jour « un » utilisateur.",
              "Relis une fois avec la checklist. Tu ne réécris pas tout au propre si le temps manque : une réponse juste et lisible bat une copie belle et fausse.",
            ],
          },
        ],
      },
      {
        id: "checklist",
        kicker: "Relecture",
        title: "Trente secondes par script",
        blocks: [
          {
            type: "table",
            columns: ["Tu vérifies", "L'erreur fréquente"],
            rows: [
              ["Le nom est celui du sujet", "trg_note au lieu de TRG_BloquerComment"],
              ["RETURN est présent sur la fonction", "Procédure déguisée, 0 point sur le type"],
              ["FOR EACH ROW si :NEW", ":NEW hors ligne, ne compile pas"],
              ["BEFORE si on modifie :NEW", "AFTER, la date ne s'écrit pas"],
              ["Parenthèses des CREATE équilibrées", "Un ); oublié, tout le script suivant casse"],
              ["Statut entre quotes", "statut = valide sans quotes, colonne inconnue"],
              ["Séquence .NEXTVAL et pas .NEXT_VAL", "Orthographe inventée"],
            ],
          },
          {
            type: "callout",
            tone: "exam",
            title: "L'ordre des points sur une copie de 20",
            body: "En général : table 2, vue 2, trigger 2, fonction 3, procédure 2, ou l'inverse selon le sujet. Si tu bloques sur le trigger à deux conditions, rends quand même la fonction et la procédure. Ce sont des points séparés.",
          },
        ],
      },
      {
        id: "mini",
        kicker: "Exemple guidé",
        title: "Un mini sujet, déroulé",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Énoncé réduit. Modèle : `emprunt(id_emprunt, #id_ouvrage, #id_lecteur, date_emprunt, date_retour)`.",
              "1. Table emprunt. 2. Trigger qui interdit un second emprunt ouvert du même ouvrage (`date_retour` vide). 3. Fonction `NbOuverts(p_lecteur)` . 4. Procédure `Rendre(p_emprunt)` qui pose `date_retour = SYSDATE`.",
            ],
          },
          {
            type: "code",
            title: "Les quatre objets, version finale",
            code: `CREATE TABLE emprunt (
  id_emprunt    NUMBER PRIMARY KEY,
  id_ouvrage    NUMBER NOT NULL,
  id_lecteur    NUMBER NOT NULL,
  date_emprunt  DATE DEFAULT SYSDATE NOT NULL,
  date_retour   DATE,
  CONSTRAINT fk_emp_ouv FOREIGN KEY (id_ouvrage) REFERENCES ouvrage (id_ouvrage),
  CONSTRAINT fk_emp_lec FOREIGN KEY (id_lecteur) REFERENCES lecteur (id_lecteur),
  CONSTRAINT ck_emp_dates CHECK (date_retour IS NULL OR date_retour >= date_emprunt)
);

CREATE OR REPLACE TRIGGER trg_un_seul_ouvert
BEFORE INSERT ON emprunt
FOR EACH ROW
DECLARE
  v_n NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_n
    FROM emprunt
   WHERE id_ouvrage = :NEW.id_ouvrage
     AND date_retour IS NULL;
  IF v_n > 0 THEN
    RAISE_APPLICATION_ERROR(-20100, 'Ouvrage déjà sorti.');
  END IF;
END;
/

CREATE OR REPLACE FUNCTION nbouverts (p_lecteur IN lecteur.id_lecteur%TYPE)
RETURN NUMBER
IS
  v_n NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_n
    FROM emprunt
   WHERE id_lecteur = p_lecteur
     AND date_retour IS NULL;
  RETURN v_n;
END;
/

CREATE OR REPLACE PROCEDURE rendre (p_emprunt IN emprunt.id_emprunt%TYPE)
IS
BEGIN
  UPDATE emprunt
     SET date_retour = SYSDATE
   WHERE id_emprunt = p_emprunt
     AND date_retour IS NULL;
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20101, 'Emprunt introuvable ou déjà rendu.');
  END IF;
END;
/`,
          },
          {
            type: "callout",
            tone: "tip",
            title: "Ce mini sujet est le patron",
            body: "Bibliothèque, clinique, école, contenus : le squelette ne change pas. Seuls changent les noms et la condition du IF. Entraîne-toi à le réécrire sans regarder, puis passe aux examens.",
          },
        ],
      },
    ],
    drill: [
      {
        kind: "mcq",
        id: "me-1",
        points: 1,
        prompt: "« Empêche l'ajout d'un commentaire si la note n'est pas entre 0 et 5. » Premier réflexe ?",
        choices: [
          { id: "a", text: "CHECK uniquement, même si plus tard on ajoute une lecture du contenu" },
          { id: "b", text: "TRIGGER BEFORE INSERT FOR EACH ROW + test sur :NEW.note" },
          { id: "c", text: "Une vue qui filtre les mauvaises notes" },
          { id: "d", text: "REVOKE INSERT ON commentaire" },
        ],
        answer: "b",
        why: "« Empêche l'ajout » est la définition du trigger BEFORE. La vue filtrerait la lecture, pas l'écriture. REVOKE bloque tout le monde, pas seulement les mauvaises notes.",
      },
      {
        kind: "mcq",
        id: "me-2",
        points: 1,
        prompt: "Tu as 20 minutes et quatre objets. Le trigger te bloque. Que rends-tu ?",
        choices: [
          { id: "a", text: "Rien : une copie incomplète vaut zéro" },
          { id: "b", text: "Les autres objets complets, et le squelette du trigger avec le RAISE même imparfait" },
          { id: "c", text: "Seulement une explication en français" },
          { id: "d", text: "Un diagramme UML" },
        ],
        answer: "b",
        why: "Le barème est découpé. Un squelette nommé correctement prend déjà une partie des points. Le français seul ne compile pas.",
      },
      {
        kind: "mcq",
        id: "me-3",
        points: 1,
        prompt: "Le sujet écrit le statut 'Validé'. Dans le WHERE tu écris…",
        choices: [
          { id: "a", text: "status = Validé" },
          { id: "b", text: "status = 'Validé'  (ou LOWER si tu justifies la casse)" },
          { id: "c", text: "status == \"Validé\"" },
          { id: "d", text: "status LIKE Valide%" },
        ],
        answer: "b",
        why: "Les chaînes SQL prennent des quotes simples. Le double égal n'existe pas. Copie le mot du sujet.",
      },
    ],
  },
];

export function lessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

export function nextLessonId(id: string) {
  const index = lessons.findIndex((lesson) => lesson.id === id);
  return lessons[index + 1]?.id;
}

export function prevLessonId(id: string) {
  const index = lessons.findIndex((lesson) => lesson.id === id);
  return index > 0 ? lessons[index - 1]?.id : undefined;
}
