var e=[{id:`qcm-session`,title:`QCM — session type IG3`,context:`Même forme que la partie 1 du sujet de 2 heures`,minutes:25,level:`échauffement`,intro:`Une seule réponse. Pas de justification demandée ici : le corrigé explique chaque piège après la remise. Les questions 1 à 10 suivent le sujet photographié, les suivantes prolongent le cours.`,questions:[{kind:`mcq`,id:`q1`,points:1,prompt:`Dans Oracle, quelle commande modifie la structure d'une table existante ?`,choices:[{id:`a`,text:`CHANGE TABLE`},{id:`b`,text:`MODIFY TABLE`},{id:`c`,text:`ALTER TABLE`},{id:`d`,text:`UPDATE TABLE`}],answer:`c`,why:`ALTER TABLE change colonnes et contraintes. UPDATE change les valeurs des lignes.`},{kind:`mcq`,id:`q2`,points:1,prompt:`Que fait DELETE FROM employe; ?`,choices:[{id:`a`,text:`Supprime la table employe`},{id:`b`,text:`Supprime toutes les lignes de la table employe`},{id:`c`,text:`Supprime uniquement les lignes où la condition est vraie`},{id:`d`,text:`Supprime la table et ses contraintes`}],answer:`b`,why:`Il n'y a pas de WHERE : toutes les lignes partent, la table reste. C décrit DELETE avec un WHERE, qui n'est pas écrit.`},{kind:`mcq`,id:`q3`,points:1,prompt:`Différence principale entre DELETE et TRUNCATE ?`,choices:[{id:`a`,text:`DELETE est plus rapide que TRUNCATE`},{id:`b`,text:`TRUNCATE conserve et déclenche les triggers DML`},{id:`c`,text:`TRUNCATE ne peut pas être annulé par un ROLLBACK`},{id:`d`,text:`DELETE supprime les colonnes au lieu des lignes`}],answer:`c`,why:`TRUNCATE est du DDL : commit implicite, pas de trigger de ligne, plus rapide que DELETE.`},{kind:`mcq`,id:`q4`,points:1,prompt:`Quel mot-clé récupère les N premières lignes d'une requête dans Oracle ?`,choices:[{id:`a`,text:`LIMIT`},{id:`b`,text:`TOP`},{id:`c`,text:`FETCH FIRST N ROWS ONLY`},{id:`d`,text:`ROW_NUMBER`}],answer:`c`,why:`Syntaxe Oracle 12c et suivantes. LIMIT est MySQL, TOP est SQL Server.`},{kind:`mcq`,id:`q5`,points:1,prompt:`Dans une procédure PL/SQL, quelle clause gère les exceptions ?`,choices:[{id:`a`,text:`CATCH`},{id:`b`,text:`TRY`},{id:`c`,text:`EXCEPTION`},{id:`d`,text:`WHEN`}],answer:`c`,why:`La section s'appelle EXCEPTION. WHEN est un aiguillage à l'intérieur de cette section.`},{kind:`mcq`,id:`q6`,points:1,prompt:`Quelle commande renomme une table dans Oracle ?`,choices:[{id:`a`,text:`RENAME TABLE ancienne_table TO nouvelle_table`},{id:`b`,text:`ALTER TABLE ancienne_table RENAME TO nouvelle_table`},{id:`c`,text:`UPDATE TABLE ancienne_table SET NAME = nouvelle_table`},{id:`d`,text:`CHANGE TABLE ancienne_table TO nouvelle_table`}],answer:`b`,why:`A est la syntaxe MySQL. Oracle : ALTER TABLE … RENAME TO, ou RENAME ancien TO nouveau sans le mot TABLE.`},{kind:`mcq`,id:`q7`,points:1,prompt:`Que fait SELECT DISTINCT id_langue FROM utilisateur; ?`,choices:[{id:`a`,text:`Sélectionne toutes les langues triées par nom`},{id:`b`,text:`Sélectionne les id_langue sans doublon`},{id:`c`,text:`Supprime les doublons dans la table`},{id:`d`,text:`Supprime les utilisateurs sans langue`}],answer:`b`,why:`DISTINCT ne trie pas et n'efface aucune ligne stockée.`},{kind:`mcq`,id:`q8`,points:1,prompt:`Quel objet PL/SQL peut retourner une seule valeur scalaire ?`,choices:[{id:`a`,text:`Une procédure`},{id:`b`,text:`Une fonction`},{id:`c`,text:`Un trigger`},{id:`d`,text:`Un paquet (package)`}],answer:`b`,why:`La fonction est utilisée comme une valeur. Le package regroupe des sous-programmes, il n'est pas lui-même une valeur.`},{kind:`mcq`,id:`q9`,points:1,prompt:`Un trigger BEFORE INSERT lève une exception non gérée. Que se passe-t-il ?`,choices:[{id:`a`,text:`L'insertion est annulée`},{id:`b`,text:`Le trigger est ignoré`},{id:`c`,text:`L'insertion est effectuée partiellement`},{id:`d`,text:`L'exception est stockée et la ligne est gardée`}],answer:`a`,why:`L'exception non gérée fait échouer l'ordre qui a réveillé le trigger.`},{kind:`mcq`,id:`q10`,points:1,prompt:`Quelle instruction PL/SQL permet de boucler un nombre précis de fois ?`,choices:[{id:`a`,text:`WHILE`},{id:`b`,text:`FOR`},{id:`c`,text:`LOOP`},{id:`d`,text:`REPEAT`}],answer:`b`,why:`FOR i IN 1..n fixe les bornes. REPEAT n'existe pas en PL/SQL.`},{kind:`mcq`,id:`q11`,points:1,prompt:`TRUNC(15.9) vaut…`,choices:[{id:`a`,text:`16`},{id:`b`,text:`15`},{id:`c`,text:`15.9`},{id:`d`,text:`NULL`}],answer:`b`,why:`TRUNC coupe les décimales, il n'arrondit pas. ROUND(15.9) = 16.`},{kind:`mcq`,id:`q12`,points:1,prompt:`Laquelle de ces déclarations compile ?`,choices:[{id:`a`,text:`v_x, v_y VARCHAR2(10);`},{id:`b`,text:`v_ok BOOLEAN := 1;`},{id:`c`,text:`v_d DATE NOT NULL;`},{id:`d`,text:`v_id NUMBER(4);`}],answer:`d`,why:`Une variable par ligne, BOOLEAN seulement TRUE/FALSE/NULL, NOT NULL toujours initialisé.`}]},{id:`declarations`,title:`Déclarations PL/SQL`,context:`Exercice 1 du rattrapage, élargi`,minutes:20,level:`échauffement`,intro:`Pour chaque extrait, dis s'il est correct ou incorrect. On suppose qu'un type nommé dans l'extrait existe déjà s'il n'est pas déclaré sur place. La justification du corrigé s'affiche après la remise : écris la tienne, elle n'est pas notée automatiquement.`,questions:[{kind:`verdict`,id:`dec`,prompt:`Ces déclarations sont-elles correctes ?`,items:[{id:`a`,code:`v_id NUMBER(4);`,ok:!0,points:1,why:`NUMBER(4) est une précision légale. Pas d'initialisation exigée tant qu'il n'y a pas NOT NULL.`},{id:`b`,code:`v_x, v_y, v_z VARCHAR2(10);`,ok:!1,points:1,why:`PL/SQL refuse la liste. Il faut trois instructions : v_x VARCHAR2(10); puis v_y, puis v_z.`},{id:`c`,code:`v_date_naissance DATE NOT NULL;`,ok:!1,points:1,why:`Une variable NOT NULL doit être initialisée : DATE NOT NULL := SYSDATE; sinon PLS-00218.`},{id:`d`,code:`v_en_stock BOOLEAN := 1;`,ok:!1,points:1,why:`BOOLEAN n'accepte que TRUE, FALSE et NULL. 1 est un NUMBER.`},{id:`e`,code:`emp_record emp_record_type;`,ok:!0,points:1,why:`Syntaxe d'une variable de type record ou objet, si emp_record_type est connu. Le sujet le présente ainsi : on la compte correcte.`},{id:`f`,code:`TYPE type_table_nom IS TABLE OF VARCHAR2(20) INDEX BY BINARY_INTEGER;
dept_table_nom type_table_nom;`,ok:!0,points:1,why:`Tableau associatif. BINARY_INTEGER reste accepté. L'élément VARCHAR2 a bien une taille.`},{id:`g`,code:`v_nom VARCHAR2;`,ok:!1,points:1,why:`VARCHAR2 en variable exige une longueur, VARCHAR2(n), sauf ancrage %TYPE.`},{id:`h`,code:`v_ok BOOLEAN NOT NULL := TRUE;`,ok:!0,points:1,why:`NOT NULL est légal parce que l'initialisation est là, et TRUE est une valeur booléenne.`},{id:`i`,code:`v_salaire employees.salaire%TYPE;`,ok:!0,points:1,why:`%TYPE ancre la variable sur la colonne. Pas besoin de répéter NUMBER.`},{id:`j`,code:`v_today DATE NOT NULL := SYSDATE;`,ok:!0,points:1,why:`C'est la forme correcte de la déclaration C du sujet.`}]}]},{id:`rattrapage-cms`,title:`Rattrapage — contenus et commentaires`,context:`UE Administration des bases de données · 1 h 30`,minutes:90,level:`partiel`,intro:`Sujet calé sur le rattrapage IG3. Les noms anglais sont ceux de la feuille : ne les traduis pas. date_inscription est une date, pas une clé étrangère.`,schemaTitle:`Modèle logique`,schema:`users(id_user, name, email, #id_role, #id_language, date_inscription, status)
roles(id_role, name)
languages(id_language, name, code, description)
types_contents(id_type_content, name)
contents(id_content, title, #id_type_content, texte, date_creation, status, #id_user, #id_region, #id_language)
regions(id_region, name)
comments(id_comment, texte, note, date_comment, #id_user, #id_content)`,questions:[{kind:`code`,id:`r1`,prompt:`1. Donnez le code SQL de création de la table users (2 pts). Les tables roles et languages sont déjà créées.`,solution:`CREATE TABLE users (
  id_user          NUMBER PRIMARY KEY,
  name             VARCHAR2(100) NOT NULL,
  email            VARCHAR2(150),
  id_role          NUMBER,
  id_language      NUMBER,
  date_inscription DATE DEFAULT SYSDATE,
  status           VARCHAR2(30),
  CONSTRAINT fk_users_role FOREIGN KEY (id_role) REFERENCES roles (id_role),
  CONSTRAINT fk_users_lang FOREIGN KEY (id_language) REFERENCES languages (id_language)
);`,why:`PK sur id_user, deux FK, date_inscription en DATE. Les tailles VARCHAR2 ne sont pas imposées : une taille raisonnable suffit.`,checks:[{id:`ct`,label:`CREATE TABLE users`,points:1,match:/create\s+table\s+users\b/},{id:`pk`,label:`id_user clé primaire`,points:1,match:/id_user[\s\S]{0,80}primary\s+key|primary\s+key\s*\(\s*id_user\s*\)/},{id:`fk1`,label:`FK vers roles`,points:1,match:/references\s+roles\s*\(/},{id:`fk2`,label:`FK vers languages`,points:1,match:/references\s+languages\s*\(/},{id:`dt`,label:`date_inscription de type DATE`,points:1,match:/date_inscription\s+date\b/}]},{kind:`code`,id:`r2`,prompt:`2. Créez une vue Vue_Contents affichant pour chaque contenu son titre, son type et le nombre total de commentaires reçus (2 pts).`,solution:`CREATE OR REPLACE VIEW vue_contents AS
SELECT c.title,
       t.name AS type_contenu,
       COUNT(cm.id_comment) AS nb_commentaires
  FROM contents c
  JOIN types_contents t ON t.id_type_content = c.id_type_content
  LEFT JOIN comments cm ON cm.id_content = c.id_content
 GROUP BY c.id_content, c.title, t.name;`,why:`LEFT JOIN pour ne pas perdre les contenus sans commentaire. GROUP BY inclut la clé.`,checks:[{id:`v`,label:`CREATE VIEW vue_contents`,points:1,match:/create\s+(or\s+replace\s+)?view\s+vue_contents\b/},{id:`j`,label:`Jointure vers types_contents`,points:1,match:/types_contents/},{id:`c`,label:`COUNT des commentaires`,points:1,match:/count\s*\(/},{id:`g`,label:`GROUP BY`,points:1,match:/group\s+by/},{id:`l`,label:`LEFT JOIN pour garder les zéros`,points:1,match:/left\s+(outer\s+)?join\s+comments/}]},{kind:`code`,id:`r3`,prompt:`3. Créez un trigger TRG_BloquerComment qui empêche l'ajout d'un commentaire si sa note n'est pas comprise entre 0 et 5 (2 pts).`,solution:`CREATE OR REPLACE TRIGGER trg_bloquercomment
BEFORE INSERT ON comments
FOR EACH ROW
BEGIN
  IF :NEW.note IS NULL OR :NEW.note < 0 OR :NEW.note > 5 THEN
    RAISE_APPLICATION_ERROR(-20010, 'La note doit être comprise entre 0 et 5.');
  END IF;
END;
/`,why:`BEFORE INSERT FOR EACH ROW, test sur :NEW.note, RAISE pour annuler l'insertion.`,checks:[{id:`n`,label:`Trigger nommé TRG_BloquerComment`,points:1,match:/trigger\s+trg_bloquercomment\b/},{id:`b`,label:`BEFORE INSERT FOR EACH ROW`,points:1,match:/before\s+insert[\s\S]{0,80}for\s+each\s+row/},{id:`note`,label:`Test de la note entre 0 et 5`,points:1,match:/:new\.note/},{id:`r`,label:`RAISE pour refuser`,points:1,match:/raise/}]},{kind:`code`,id:`r4`,prompt:`4. Fonction NbContentsByLanguage(v_id_language) qui retourne le nombre de contenus au statut Validé pour cette langue (3 pts).`,solution:`CREATE OR REPLACE FUNCTION nbcontentsbylanguage (
  v_id_language IN languages.id_language%TYPE
) RETURN NUMBER
IS
  v_total NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_total
    FROM contents
   WHERE id_language = v_id_language
     AND status = 'Validé';
  RETURN v_total;
END;
/`,why:`Fonction scalaire, COUNT INTO, filtre status = 'Validé' comme sur la feuille.`,checks:[{id:`fn`,label:`FUNCTION NbContentsByLanguage`,points:1,match:/function\s+nbcontentsbylanguage\b/},{id:`ret`,label:`RETURN NUMBER`,points:1,match:/return\s+number\b/},{id:`cnt`,label:`COUNT INTO`,points:1,match:/count\s*\([\s\S]{0,40}into/},{id:`st`,label:`Statut Validé`,points:1,match:/valid[eé]/},{id:`back`,label:`RETURN de la variable`,points:1,match:/return\s+v_/}]},{kind:`code`,id:`r5`,prompt:`5. Procédure ChangerLangueUtilisateur(v_id_user, v_id_language) qui met à jour la langue préférée de l'utilisateur (2 pts).`,solution:`CREATE OR REPLACE PROCEDURE changerlangueutilisateur (
  v_id_user     IN users.id_user%TYPE,
  v_id_language IN languages.id_language%TYPE
) IS
BEGIN
  UPDATE users
     SET id_language = v_id_language
   WHERE id_user = v_id_user;
END;
/`,why:`Procédure, pas de RETURN dans la signature. UPDATE de id_language.`,checks:[{id:`p`,label:`PROCEDURE ChangerLangueUtilisateur`,points:1,match:/procedure\s+changerlangueutilisateur\b/},{id:`u`,label:`UPDATE users`,points:1,match:/update\s+users\b/},{id:`set`,label:`Affecte id_language`,points:1,match:/set\s+id_language\s*=/},{id:`w`,label:`Filtre id_user`,points:1,match:/where\s+id_user\s*=/}]}]},{id:`session-contenu`,title:`Session 2 h — étude de cas contenu`,context:`Partie 2 du sujet de session normale`,minutes:70,level:`partiel`,intro:`Même famille que le rattrapage, avec les noms français de la page 2 et un trigger à deux conditions. La table à créer est contenu, pas utilisateur.`,schemaTitle:`Modèle logique`,schema:`Role(id_role, nom_role)
Langue(id_langue, nom_langue, code_langue, description)
Region(id_region, nom_region)
Type_contenu(id_type_contenu, nom)
Utilisateur(id_utilisateur, nom, prenom, email, #id_role, #id_langue, date_inscription, statut)
Contenu(id_contenu, titre, #id_type_contenu, texte, date_creation, statut, #id_auteur, #id_region, #id_langue)
Commentaire(id_commentaire, texte, note, date, #id_utilisateur, #id_contenu)`,questions:[{kind:`code`,id:`s1`,prompt:`1. Code SQL de création de la table contenu. Les tables référencées existent.`,solution:`CREATE TABLE contenu (
  id_contenu      NUMBER PRIMARY KEY,
  titre           VARCHAR2(200) NOT NULL,
  id_type_contenu NUMBER,
  texte           CLOB,
  date_creation   DATE DEFAULT SYSDATE,
  statut          VARCHAR2(20),
  id_auteur       NUMBER,
  id_region       NUMBER,
  id_langue       NUMBER,
  CONSTRAINT fk_c_type FOREIGN KEY (id_type_contenu) REFERENCES type_contenu (id_type_contenu),
  CONSTRAINT fk_c_aut  FOREIGN KEY (id_auteur) REFERENCES utilisateur (id_utilisateur),
  CONSTRAINT fk_c_reg  FOREIGN KEY (id_region) REFERENCES region (id_region),
  CONSTRAINT fk_c_lang FOREIGN KEY (id_langue) REFERENCES langue (id_langue)
);`,why:`Quatre clés étrangères, texte long en CLOB, date de création par défaut.`,checks:[{id:`ct`,label:`CREATE TABLE contenu`,points:1,match:/create\s+table\s+contenu\b/},{id:`pk`,label:`Clé primaire id_contenu`,points:1,match:/id_contenu[\s\S]{0,60}primary\s+key|primary\s+key\s*\(\s*id_contenu\s*\)/},{id:`fa`,label:`FK auteur vers utilisateur`,points:1,match:/references\s+utilisateur\s*\(/},{id:`fl`,label:`FK langue`,points:1,match:/references\s+langue\s*\(/}]},{kind:`code`,id:`s2`,prompt:`2. Vue Vue_AuteursActifs : nom, prénom et nombre total de contenus publiés, pour chaque utilisateur ayant publié au moins un contenu.`,solution:`CREATE OR REPLACE VIEW vue_auteursactifs AS
SELECT u.nom, u.prenom, COUNT(c.id_contenu) AS nb_contenus
  FROM utilisateur u
  JOIN contenu c ON c.id_auteur = u.id_utilisateur
 WHERE LOWER(c.statut) IN ('publié', 'publie')
 GROUP BY u.id_utilisateur, u.nom, u.prenom;`,why:`JOIN interne = au moins un contenu. WHERE sur le statut publié. GROUP BY de la clé utilisateur.`,checks:[{id:`v`,label:`Vue Vue_AuteursActifs`,points:1,match:/view\s+vue_auteursactifs\b/},{id:`c`,label:`COUNT`,points:1,match:/count\s*\(/},{id:`g`,label:`GROUP BY`,points:1,match:/group\s+by/},{id:`p`,label:`Filtre publié`,points:1,match:/publi[eé]/}]},{kind:`code`,id:`s3`,prompt:`3. Trigger TRG_BloquerCommentaire : interdit l'INSERT si la note n'est pas entre 0 et 5, ou si le contenu n'a pas le statut 'valide'.`,solution:`CREATE OR REPLACE TRIGGER trg_bloquercommentaire
BEFORE INSERT ON commentaire
FOR EACH ROW
DECLARE
  v_statut contenu.statut%TYPE;
BEGIN
  IF :NEW.note IS NULL OR :NEW.note < 0 OR :NEW.note > 5 THEN
    RAISE_APPLICATION_ERROR(-20021, 'Note hors 0..5.');
  END IF;
  SELECT statut INTO v_statut FROM contenu WHERE id_contenu = :NEW.id_contenu;
  IF LOWER(v_statut) <> 'valide' THEN
    RAISE_APPLICATION_ERROR(-20022, 'Contenu non valide.');
  END IF;
END;
/`,why:`Deux règles : la note sur :NEW, le statut lu dans contenu (autre table, donc pas mutante).`,checks:[{id:`t`,label:`Nom TRG_BloquerCommentaire`,points:1,match:/trigger\s+trg_bloquercommentaire\b/},{id:`b`,label:`BEFORE INSERT ligne`,points:1,match:/before\s+insert[\s\S]{0,100}for\s+each\s+row/},{id:`n`,label:`Contrôle de :NEW.note`,points:1,match:/:new\.note/},{id:`s`,label:`Lecture du statut contenu`,points:1,match:/from\s+contenu/},{id:`r`,label:`RAISE`,points:1,match:/raise/}]},{kind:`code`,id:`s4`,prompt:`4. Fonction NbContenusParLangue(p_id_langue) : nombre de contenus publiés dans cette langue.`,solution:`CREATE OR REPLACE FUNCTION nbcontenusparlangue (p_id_langue IN langue.id_langue%TYPE)
RETURN NUMBER
IS
  v_n NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_n
    FROM contenu
   WHERE id_langue = p_id_langue
     AND LOWER(statut) IN ('publié', 'publie');
  RETURN v_n;
END;
/`,why:`Le sujet de la page 2 dit « publiés », pas « validés ». Ne mélange pas avec le rattrapage.`,checks:[{id:`f`,label:`Fonction NbContenusParLangue`,points:1,match:/function\s+nbcontenusparlangue\b/},{id:`r`,label:`RETURN NUMBER`,points:1,match:/return\s+number\b/},{id:`c`,label:`COUNT INTO`,points:1,match:/count\s*\([\s\S]{0,30}into/},{id:`p`,label:`Statut publié`,points:1,match:/publi[eé]/}]},{kind:`code`,id:`s5`,prompt:`5. Procédure ChangerLangueUtilisateur(p_id_utilisateur, p_id_langue) qui met à jour la langue préférée.`,solution:`CREATE OR REPLACE PROCEDURE changerlangueutilisateur (
  p_id_utilisateur IN utilisateur.id_utilisateur%TYPE,
  p_id_langue      IN langue.id_langue%TYPE
) IS
BEGIN
  UPDATE utilisateur
     SET id_langue = p_id_langue
   WHERE id_utilisateur = p_id_utilisateur;
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20030, 'Utilisateur introuvable.');
  END IF;
END;
/`,why:`Même geste que le rattrapage, table utilisateur au singulier français.`,checks:[{id:`p`,label:`Procédure au nom demandé`,points:1,match:/procedure\s+changerlangueutilisateur\b/},{id:`u`,label:`UPDATE utilisateur`,points:1,match:/update\s+utilisateur\b/},{id:`s`,label:`SET id_langue`,points:1,match:/set\s+id_langue\s*=/}]}]},{id:`session-employes`,title:`Session normale — table EMPLOYEES`,context:`UAC · ENEAM · L3 AIP et ARI · 2 heures`,minutes:60,level:`partiel`,intro:`Sujet EMPLOYEES. Le CHECK demandé à 33500 contredit le défaut 2500 : suis le chiffre de chaque question, signale l'incohérence seulement en commentaire.`,schemaTitle:`Colonnes imposées`,schema:`EMPLOYEES(
  ID             numérique, clé primaire,
  NOM            chaîne, 50 max,
  PRENOM         chaîne, 50 max,
  DATE_EMBAUCHE  date, obligatoire,
  SALAIRE        numérique, défaut 2500
)`,questions:[{kind:`code`,id:`e1`,prompt:`1. Code SQL de création de la table EMPLOYEES dans Oracle.`,solution:`CREATE TABLE employees (
  id             NUMBER PRIMARY KEY,
  nom            VARCHAR2(50),
  prenom         VARCHAR2(50),
  date_embauche  DATE NOT NULL,
  salaire        NUMBER DEFAULT 2500
);`,why:`Cinq colonnes, aucune de plus. VARCHAR2(50), DATE NOT NULL, DEFAULT 2500.`,checks:[{id:`c`,label:`CREATE TABLE employees`,points:1,match:/create\s+table\s+employees\b/},{id:`pk`,label:`ID clé primaire numérique`,points:1,match:/\bid\s+number[\s\S]{0,40}primary\s+key|primary\s+key\s*\(\s*id\s*\)/},{id:`n`,label:`NOM et PRENOM en VARCHAR2(50)`,points:1,match:/nom\s+varchar2\s*\(\s*50\s*\)[\s\S]{0,80}prenom\s+varchar2\s*\(\s*50\s*\)/},{id:`d`,label:`DATE_EMBAUCHE NOT NULL`,points:1,match:/date_embauche\s+date\s+not\s+null/},{id:`s`,label:`SALAIRE DEFAULT 2500`,points:1,match:/salaire\s+number\s+default\s+2500/}]},{kind:`code`,id:`e2`,prompt:`2. Ajoute une contrainte : SALAIRE ne peut pas être inférieur à 33500.`,solution:`ALTER TABLE employees
  ADD CONSTRAINT ck_emp_salaire CHECK (salaire >= 33500);`,why:`ADD CONSTRAINT … CHECK. « Pas inférieur » s'écrit >=. Le défaut 2500 devient alors illégal : c'est le sujet, pas toi.`,checks:[{id:`a`,label:`ALTER TABLE employees`,points:1,match:/alter\s+table\s+employees\b/},{id:`c`,label:`CHECK sur 33500`,points:1,match:/check\s*\([\s\S]{0,80}33500/},{id:`g`,label:`Comparaison >= ou équivalent NOT <`,points:1,match:/salaire\s*>=\s*33500|salaire\s+not\s*<\s*33500|not\s*\(\s*salaire\s*<\s*33500\s*\)/}]},{kind:`code`,id:`e3`,prompt:`3. Séquence SEQ_EMPLOYES_ID : commence à 1, pas de 1, maximum 1 000 000, cyclique.`,solution:`CREATE SEQUENCE seq_employes_id
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 1000000
  CYCLE;`,why:`CYCLE exige un MAXVALUE. Après 1000000, Oracle repart de MINVALUE (1 par défaut).`,checks:[{id:`s`,label:`CREATE SEQUENCE seq_employes_id`,points:1,match:/create\s+sequence\s+seq_employes_id\b/},{id:`st`,label:`START WITH 1`,points:1,match:/start\s+with\s+1\b/},{id:`mx`,label:`MAXVALUE 1000000`,points:1,match:/maxvalue\s+1000000\b/},{id:`cy`,label:`CYCLE`,points:1,match:/\bcycle\b/}]},{kind:`code`,id:`e4`,prompt:`4. Fonction CALCULER_SALAIRE_ANNUEL(salaire_mensuel). Retourne salaire × 12. Erreur si le salaire est inférieur ou égal à 0.`,solution:`CREATE OR REPLACE FUNCTION calculer_salaire_annuel (
  salaire_mensuel IN NUMBER
) RETURN NUMBER
IS
BEGIN
  IF salaire_mensuel IS NULL OR salaire_mensuel <= 0 THEN
    RAISE_APPLICATION_ERROR(-20001, 'Salaire mensuel invalide.');
  END IF;
  RETURN salaire_mensuel * 12;
END;
/`,why:`RETURN NUMBER, test <= 0, puis le produit. RAISE_APPLICATION_ERROR plutôt qu'un RETURN de texte.`,checks:[{id:`f`,label:`Nom de la fonction`,points:1,match:/function\s+calculer_salaire_annuel\b/},{id:`r`,label:`RETURN NUMBER`,points:1,match:/return\s+number\b/},{id:`m`,label:`Multiplication par 12`,points:1,match:/\*\s*12\b/},{id:`e`,label:`Erreur si salaire <= 0`,points:1,match:/raise[\s\S]{0,120}(<=\s*0|< =\s*0)|(<=\s*0)[\s\S]{0,160}raise/}]},{kind:`code`,id:`e5`,prompt:`5. Procédure AJOUTER_EMPLOYE(nom, prenom, date_embauche, salaire). Insère une ligne, ID via SEQ_EMPLOYES_ID, message de confirmation.`,solution:`CREATE OR REPLACE PROCEDURE ajouter_employe (
  p_nom IN employees.nom%TYPE,
  p_prenom IN employees.prenom%TYPE,
  p_date IN employees.date_embauche%TYPE,
  p_salaire IN employees.salaire%TYPE
) IS
  v_id employees.id%TYPE;
BEGIN
  v_id := seq_employes_id.NEXTVAL;
  INSERT INTO employees (id, nom, prenom, date_embauche, salaire)
  VALUES (v_id, p_nom, p_prenom, p_date, p_salaire);
  DBMS_OUTPUT.PUT_LINE('Employé inséré, ID ' || v_id);
END;
/`,why:`NEXTVAL pour l'id, INSERT nommé, PUT_LINE comme message.`,checks:[{id:`p`,label:`Procédure AJOUTER_EMPLOYE`,points:1,match:/procedure\s+ajouter_employe\b/},{id:`n`,label:`seq_employes_id.NEXTVAL`,points:1,match:/seq_employes_id\s*\.\s*nextval/},{id:`i`,label:`INSERT INTO employees`,points:1,match:/insert\s+into\s+employees\b/},{id:`m`,label:`DBMS_OUTPUT`,points:1,match:/dbms_output\s*\.\s*put_line/}]},{kind:`code`,id:`e6`,prompt:`6. Procédure MISE_A_JOUR_SALAIRE(id, nouveau_salaire). Refuse un salaire inférieur à 33500 avec une exception explicite. Donne aussi un exemple d'appel.`,solution:`CREATE OR REPLACE PROCEDURE mise_a_jour_salaire (
  p_id IN employees.id%TYPE,
  p_nouveau_salaire IN NUMBER
) IS
BEGIN
  IF p_nouveau_salaire < 33500 THEN
    RAISE_APPLICATION_ERROR(-20002, 'Salaire inférieur à 33500.');
  END IF;
  UPDATE employees SET salaire = p_nouveau_salaire WHERE id = p_id;
END;
/

BEGIN
  mise_a_jour_salaire(1, 40000);
END;
/`,why:`Le test précède l'UPDATE. L'exemple d'appel est un bloc anonyme.`,checks:[{id:`p`,label:`Procédure MISE_A_JOUR_SALAIRE`,points:1,match:/procedure\s+mise_a_jour_salaire\b/},{id:`c`,label:`Refuse sous 33500`,points:1,match:/<\s*33500/},{id:`r`,label:`RAISE`,points:1,match:/raise/},{id:`u`,label:`UPDATE employees`,points:1,match:/update\s+employees\b/},{id:`ex`,label:`Exemple d'appel`,points:1,match:/mise_a_jour_salaire\s*\(/}]}]},{id:`devoir-ecole`,title:`Devoir ARI — base école`,context:`Devoir d'administration, classes et notes`,minutes:90,level:`partiel`,intro:`Le devoir demandé en 12 points est regroupé en 8 scripts. Quatre étudiants à insérer : trois dans la première classe, un dans la seconde. Les identifiants de matières sortent M100, M110, M120…`,schemaTitle:`Base`,schema:`Classes(id, nom)
Etudiants(id, nom, prenom, date_naissance, sexe, email, telephone, #classe_id)
Matieres(id, nom)  -- id au format M100, M110, M120…
Obtenir(etudiant_id, matiere_id, note)`,questions:[{kind:`code`,id:`d1`,prompt:`1. Crée l'utilisateur ecole (mot de passe au choix) avec les privilèges d'un DBA.`,solution:`CREATE USER ecole IDENTIFIED BY ecole123
  DEFAULT TABLESPACE users
  QUOTA UNLIMITED ON users;

GRANT DBA TO ecole;`,why:`CREATE USER ne connecte personne. GRANT DBA est ce que le sujet demande, même si c'est trop large en production.`,checks:[{id:`u`,label:`CREATE USER ecole`,points:1,match:/create\s+user\s+ecole\b/},{id:`id`,label:`IDENTIFIED BY`,points:1,match:/identified\s+by\s+\S+/},{id:`g`,label:`GRANT DBA`,points:1,match:/grant\s+dba\s+to\s+ecole\b/}]},{kind:`code`,id:`d2`,prompt:`2. Crée une connexion nommée con_ecole pour cet utilisateur. Sur une copie, écris l'objet SQL correspondant.`,solution:`CREATE DATABASE LINK con_ecole
  CONNECT TO ecole IDENTIFIED BY ecole123
  USING 'ORCL';`,why:`SQL Developer range une connexion hors SQL. Le database link est l'objet nommable que le correcteur peut lire.`,checks:[{id:`l`,label:`DATABASE LINK con_ecole`,points:2,match:/create\s+(shared\s+|public\s+)?database\s+link\s+con_ecole\b/},{id:`c`,label:`CONNECT TO ecole`,points:1,match:/connect\s+to\s+ecole\b/}]},{kind:`code`,id:`d3`,prompt:`3. Crée les quatre tables. PK, FK classe, PK composite sur obtenir, email unique, note entre 0 et 20.`,solution:`CREATE TABLE classes (
  id  NUMBER PRIMARY KEY,
  nom VARCHAR2(50) NOT NULL
);

CREATE TABLE etudiants (
  id             NUMBER PRIMARY KEY,
  nom            VARCHAR2(50) NOT NULL,
  prenom         VARCHAR2(50) NOT NULL,
  date_naissance DATE,
  sexe           CHAR(1),
  email          VARCHAR2(120) UNIQUE,
  telephone      VARCHAR2(20),
  classe_id      NUMBER NOT NULL,
  CONSTRAINT fk_etud_classe FOREIGN KEY (classe_id) REFERENCES classes (id)
);

CREATE TABLE matieres (
  id  VARCHAR2(10) PRIMARY KEY,
  nom VARCHAR2(80) NOT NULL
);

CREATE TABLE obtenir (
  etudiant_id NUMBER NOT NULL,
  matiere_id  VARCHAR2(10) NOT NULL,
  note        NUMBER DEFAULT 0,
  CONSTRAINT pk_obtenir PRIMARY KEY (etudiant_id, matiere_id),
  CONSTRAINT fk_ob_et FOREIGN KEY (etudiant_id) REFERENCES etudiants (id),
  CONSTRAINT fk_ob_ma FOREIGN KEY (matiere_id) REFERENCES matieres (id),
  CONSTRAINT ck_note CHECK (note BETWEEN 0 AND 20)
);`,why:`id matière en VARCHAR2 à cause du préfixe M. La note est une association, clé composée des deux FK.`,checks:[{id:`cl`,label:`Table classes`,points:1,match:/create\s+table\s+classes\b/},{id:`et`,label:`Table etudiants avec FK`,points:1,match:/create\s+table\s+etudiants[\s\S]{0,500}references\s+classes\s*\(/},{id:`ma`,label:`Table matieres`,points:1,match:/create\s+table\s+matieres\b/},{id:`ob`,label:`Table obtenir, clé composée`,points:1,match:/create\s+table\s+obtenir[\s\S]{0,400}primary\s+key\s*\(\s*etudiant_id\s*,\s*matiere_id\s*\)/},{id:`ck`,label:`CHECK note 0 à 20`,points:1,match:/check\s*\([\s\S]{0,60}between\s+0\s+and\s+20|note\s*>=\s*0[\s\S]{0,40}note\s*<=\s*20/}]},{kind:`code`,id:`d4`,prompt:`4. Séquences et triggers : classes et étudiants en 1, 2, 3… ; matières en M100, M110, M120…`,solution:`CREATE SEQUENCE seq_classe START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_etudiant START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_matiere START WITH 100 INCREMENT BY 10;

CREATE OR REPLACE TRIGGER trg_bi_classe
BEFORE INSERT ON classes FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN :NEW.id := seq_classe.NEXTVAL; END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_bi_etudiant
BEFORE INSERT ON etudiants FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN :NEW.id := seq_etudiant.NEXTVAL; END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_bi_matiere
BEFORE INSERT ON matieres FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN :NEW.id := 'M' || seq_matiere.NEXTVAL; END IF;
END;
/`,why:`Le préfixe M ne sort pas de la séquence : on le concatène. INCREMENT BY 10 donne 100, 110, 120.`,checks:[{id:`s1`,label:`Séquence étudiants ou classes pas 1`,points:1,match:/create\s+sequence\s+seq_(etudiant|classe)\b[\s\S]{0,80}increment\s+by\s+1/},{id:`s2`,label:`Séquence matière départ 100 pas 10`,points:1,match:/create\s+sequence\s+seq_matiere\b[\s\S]{0,100}start\s+with\s+100[\s\S]{0,40}increment\s+by\s+10|increment\s+by\s+10[\s\S]{0,40}start\s+with\s+100/},{id:`tr`,label:`Trigger BEFORE INSERT qui pose :NEW.id`,points:1,match:/before\s+insert[\s\S]{0,120}:new\.id\s*:=/},{id:`m`,label:`Préfixe M concaténé`,points:1,match:/'m'\s*\|\|/}]},{kind:`code`,id:`d5`,prompt:`5. Insère deux classes et cinq matières. Les triggers d'identifiant peuvent remplir les id.`,solution:`INSERT INTO classes (nom) VALUES ('IG3-A');
INSERT INTO classes (nom) VALUES ('IG3-B');

INSERT INTO matieres (nom) VALUES ('Oracle');
INSERT INTO matieres (nom) VALUES ('Réseaux');
INSERT INTO matieres (nom) VALUES ('Comptabilité');
INSERT INTO matieres (nom) VALUES ('Statistique');
INSERT INTO matieres (nom) VALUES ('Anglais');`,why:`Deux INSERT classes, cinq INSERT matières. Si tes triggers n'acceptent l'id que lorsqu'il est NULL, ne passe pas l'id.`,checks:[{id:`c`,label:`INSERT dans classes`,points:1,match:/insert\s+into\s+classes\b/},{id:`m`,label:`INSERT dans matieres`,points:1,match:/insert\s+into\s+matieres\b/}]},{kind:`code`,id:`d6`,prompt:`6. Trigger : après la création d'un étudiant, une ligne Obtenir par matière, note 0.`,solution:`CREATE OR REPLACE TRIGGER trg_init_notes
AFTER INSERT ON etudiants
FOR EACH ROW
BEGIN
  INSERT INTO obtenir (etudiant_id, matiere_id, note)
  SELECT :NEW.id, m.id, 0 FROM matieres m;
END;
/`,why:`AFTER, pour que la FK vers etudiants soit satisfaite. INSERT…SELECT parcourt toutes les matières.`,checks:[{id:`a`,label:`AFTER INSERT ON etudiants`,points:1,match:/after\s+insert\s+on\s+etudiants\b/},{id:`row`,label:`FOR EACH ROW`,points:1,match:/for\s+each\s+row/},{id:`ins`,label:`INSERT INTO obtenir`,points:1,match:/insert\s+into\s+obtenir\b/},{id:`z`,label:`Note 0`,points:1,match:/,\s*0\s+from\s+matieres|, \s*0\s+from\s+matieres/}]},{kind:`code`,id:`d7`,prompt:`7. Deux vues : (a) moyenne des notes par classe ; (b) bulletin d'un étudiant (matière et note).`,solution:`CREATE OR REPLACE VIEW v_moyenne_classe AS
SELECT c.id AS classe_id, c.nom,
       ROUND(AVG(o.note), 2) AS moyenne
  FROM classes c
  JOIN etudiants e ON e.classe_id = c.id
  LEFT JOIN obtenir o ON o.etudiant_id = e.id
 GROUP BY c.id, c.nom;

CREATE OR REPLACE VIEW v_bulletin AS
SELECT e.id AS etudiant_id, e.nom, e.prenom, m.nom AS matiere, o.note
  FROM etudiants e
  JOIN obtenir o ON o.etudiant_id = e.id
  JOIN matieres m ON m.id = o.matiere_id;`,why:`Une vue n'a pas de paramètre. Tu crées la moyenne de toutes les classes, et le bulletin de tous les étudiants : le WHERE se fera à la lecture.`,checks:[{id:`v1`,label:`Vue de moyenne par classe`,points:2,match:/create\s+(or\s+replace\s+)?view[\s\S]{0,300}avg\s*\(\s*o?\.?note\s*\)/},{id:`v2`,label:`Vue bulletin avec matière et note`,points:2,match:/create\s+(or\s+replace\s+)?view[\s\S]{0,400}join\s+matieres/}]},{kind:`code`,id:`d8`,prompt:`8. Fonction moyenne d'un étudiant, testée sur tous les étudiants, puis procédure qui supprime correctement un étudiant (notes comprises).`,solution:`CREATE OR REPLACE FUNCTION moyenne_etudiant (p_id IN etudiants.id%TYPE)
RETURN NUMBER IS
  v_m NUMBER;
BEGIN
  SELECT AVG(note) INTO v_m FROM obtenir WHERE etudiant_id = p_id;
  RETURN NVL(v_m, 0);
END;
/

BEGIN
  FOR rec IN (SELECT id, nom FROM etudiants) LOOP
    DBMS_OUTPUT.PUT_LINE(rec.nom || ' : ' || moyenne_etudiant(rec.id));
  END LOOP;
END;
/

CREATE OR REPLACE PROCEDURE supprimer_etudiant (p_id IN etudiants.id%TYPE) IS
BEGIN
  DELETE FROM obtenir WHERE etudiant_id = p_id;
  DELETE FROM etudiants WHERE id = p_id;
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20040, 'Étudiant introuvable.');
  END IF;
END;
/`,why:`On efface d'abord Obtenir, sinon la FK bloque le DELETE de l'étudiant. Le test est un curseur FOR qui appelle la fonction.`,checks:[{id:`f`,label:`Fonction avec AVG INTO`,points:1,match:/function\s+\w+[\s\S]{0,250}avg\s*\(\s*note\s*\)\s+into/},{id:`t`,label:`Test sur les étudiants`,points:1,match:/from\s+etudiants[\s\S]{0,120}moyenne_|moyenne_\w+\s*\(\s*rec\.id\s*\)/},{id:`p`,label:`Procédure de suppression`,points:1,match:/procedure\s+supprimer_etudiant\b/},{id:`d`,label:`DELETE obtenir puis étudiants`,points:1,match:/delete\s+from\s+obtenir[\s\S]{0,200}delete\s+from\s+etudiants/}]}]},{id:`controle-media`,title:`Contrôle — médias, langues, publication`,context:`Contrôle manuscrit + correction au tableau`,minutes:40,level:`contrôle`,intro:`Le contrôle ne redonnait pas le modèle. Il est fixé ci-dessous pour que la copie soit corrigeable. NbLanguesParRegion lit la table Parler, comme au tableau.`,schemaTitle:`Modèle retenu`,schema:`Media(id_media, titre, type_media, statut, date_validation, date_publication, #id_region)
Region(id_region, nom_region)
Langue(id_langue, nom_langue)
Parler(id_region, id_langue)`,questions:[{kind:`code`,id:`m1`,prompt:`1. Vue V_Media_Par_type : nombre de médias de chaque type (audio, vidéo, …).`,solution:`CREATE OR REPLACE VIEW v_media_par_type AS
SELECT type_media, COUNT(*) AS nb_medias
  FROM media
 GROUP BY type_media;`,why:`Pas de paramètre, un groupe par type. COUNT(*) suffit : chaque ligne est un média.`,checks:[{id:`v`,label:`Vue V_Media_Par_type`,points:1,match:/view\s+v_media_par_type\b/},{id:`g`,label:`GROUP BY type_media`,points:1,match:/group\s+by\s+type_media\b/},{id:`c`,label:`COUNT`,points:1,match:/count\s*\(/}]},{kind:`code`,id:`m2`,prompt:`2. Trigger : met à jour date_validation quand le statut passe à 'validé'.`,solution:`CREATE OR REPLACE TRIGGER trg_date_validation
BEFORE UPDATE OF statut ON media
FOR EACH ROW
BEGIN
  IF LOWER(:NEW.statut) = 'validé'
     AND NVL(LOWER(:OLD.statut), 'x') <> 'validé' THEN
    :NEW.date_validation := SYSDATE;
  END IF;
END;
/`,why:`BEFORE pour écrire dans :NEW. On ne réécrit pas la date si le statut était déjà validé.`,checks:[{id:`b`,label:`BEFORE UPDATE`,points:1,match:/before\s+update/},{id:`row`,label:`FOR EACH ROW`,points:1,match:/for\s+each\s+row/},{id:`d`,label:`date_validation := SYSDATE`,points:1,match:/:new\.date_validation\s*:=\s*sysdate/},{id:`s`,label:`Test du statut validé`,points:1,match:/valid[eé]/}]},{kind:`code`,id:`m3`,prompt:`3. Fonction NbLanguesParRegion(p_id_region) : nombre de langues parlées dans la région.`,solution:`CREATE OR REPLACE FUNCTION nblanguesparregion (p_id_region IN region.id_region%TYPE)
RETURN NUMBER
IS
  v_n NUMBER;
BEGIN
  SELECT COUNT(id_langue) INTO v_n
    FROM parler
   WHERE id_region = p_id_region;
  RETURN v_n;
END;
/`,why:`Comme le tableau : COUNT depuis Parler filtré par la région. Signature RETURN NUMBER, pas un AS mal placé.`,checks:[{id:`f`,label:`Fonction NbLanguesParRegion`,points:1,match:/function\s+nblanguesparregion\b/},{id:`r`,label:`RETURN NUMBER`,points:1,match:/return\s+number\b/},{id:`p`,label:`Lecture de Parler`,points:1,match:/from\s+parler\b/},{id:`w`,label:`Filtre id_region`,points:1,match:/where\s+id_region\s*=/}]},{kind:`code`,id:`m4`,prompt:`4. Procédure Publier_Contenu(p_id) : passe le statut à 'publié' et enregistre la date de publication. (Table media.)`,solution:`CREATE OR REPLACE PROCEDURE publier_contenu (p_id IN media.id_media%TYPE) IS
BEGIN
  UPDATE media
     SET statut = 'publié',
         date_publication = SYSDATE
   WHERE id_media = p_id;
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20050, 'Média introuvable.');
  END IF;
END;
/`,why:`Les deux affectations dans le même SET. Le sujet manuscrit dit « contenu » : le nom de procédure reste Publier_Contenu.`,checks:[{id:`p`,label:`Procédure Publier_Contenu`,points:1,match:/procedure\s+publier_contenu\b/},{id:`s`,label:`Statut publié`,points:1,match:/statut\s*=\s*'publi[eé]'/},{id:`d`,label:`date_publication = SYSDATE`,points:1,match:/date_publication\s*=\s*sysdate/}]}]},{id:`blocs-anonymes`,title:`Blocs anonymes — affichages`,context:`Corrigé de TD : boucles, jointures, LIKE`,minutes:45,level:`contrôle`,intro:`Ici tu n'écris pas d'objet stocké. Chaque réponse est un bloc DECLARE/BEGIN ou un BEGIN seul, avec DBMS_OUTPUT.PUT_LINE.`,schemaTitle:`Modèle`,schema:`Utilisateur(id_utilisateur, nom, prenom)
Region(id_region, nom_region)
Langue(id_langue, nom_langue, code_langue, description)
Contenu(id_contenu, titre, date_creation, #id_region, #id_auteur)
Commentaire(texte, note, #id_contenu)`,questions:[{kind:`code`,id:`b1`,prompt:`1. Pour chaque contenu, affiche le titre et la moyenne des notes de ses commentaires, arrondie à 2 décimales. S'il n'y a aucune note, affiche 0.`,solution:`BEGIN
  FOR rec IN (
    SELECT c.titre, ROUND(AVG(co.note), 2) AS moyenne
      FROM contenu c
      LEFT JOIN commentaire co ON co.id_contenu = c.id_contenu
     GROUP BY c.id_contenu, c.titre
  ) LOOP
    DBMS_OUTPUT.PUT_LINE(rec.titre || ' -> ' || NVL(rec.moyenne, 0));
  END LOOP;
END;
/`,why:`LEFT JOIN + NVL : un contenu sans commentaire ne disparaît pas et n'affiche pas un vide.`,checks:[{id:`f`,label:`Curseur FOR`,points:1,match:/for\s+\w+\s+in\s*\(/},{id:`a`,label:`AVG et ROUND`,points:1,match:/round\s*\(\s*avg\s*\(/},{id:`l`,label:`LEFT JOIN commentaire`,points:1,match:/left\s+(outer\s+)?join\s+commentaire/},{id:`p`,label:`PUT_LINE`,points:1,match:/dbms_output\s*\.\s*put_line/}]},{kind:`code`,id:`b2`,prompt:`2. Liste les régions où aucun contenu n'a été publié.`,solution:`BEGIN
  FOR rec IN (
    SELECT nom_region
      FROM region
     WHERE id_region NOT IN (
       SELECT id_region FROM contenu WHERE id_region IS NOT NULL
     )
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Région sans contenu : ' || rec.nom_region);
  END LOOP;
END;
/`,why:`NOT IN avec des NULL ne marche pas : on exclut les id_region NULL du sous-select. NOT EXISTS est encore plus sûr.`,checks:[{id:`r`,label:`Lecture de region`,points:1,match:/from\s+region\b/},{id:`n`,label:`NOT IN ou NOT EXISTS`,points:1,match:/not\s+in\s*\(|not\s+exists\s*\(/},{id:`p`,label:`PUT_LINE`,points:1,match:/put_line/}]},{kind:`code`,id:`b3`,prompt:`3. Affiche les 5 contenus les plus récents : titre et date au format JJ/MM/AAAA.`,solution:`BEGIN
  FOR rec IN (
    SELECT titre, date_creation
      FROM contenu
     ORDER BY date_creation DESC
     FETCH FIRST 5 ROWS ONLY
  ) LOOP
    DBMS_OUTPUT.PUT_LINE(rec.titre || ' publié le ' || TO_CHAR(rec.date_creation, 'DD/MM/YYYY'));
  END LOOP;
END;
/`,why:`FETCH FIRST est la réponse Oracle du QCM. TO_CHAR formate la date.`,checks:[{id:`f`,label:`FETCH FIRST 5`,points:1,match:/fetch\s+first\s+5\s+rows\s+only/},{id:`o`,label:`ORDER BY date desc`,points:1,match:/order\s+by\s+date_creation\s+desc/},{id:`t`,label:`TO_CHAR … DD/MM/YYYY`,points:1,match:/to_char\s*\([\s\S]{0,60}dd\/mm\/yyyy/}]},{kind:`code`,id:`b4`,prompt:`4. Utilisateurs qui n'ont publié aucun contenu (nom et prénom).`,solution:`BEGIN
  FOR rec IN (
    SELECT u.nom, u.prenom
      FROM utilisateur u
     WHERE u.id_utilisateur NOT IN (
       SELECT DISTINCT id_auteur FROM contenu WHERE id_auteur IS NOT NULL
     )
  ) LOOP
    DBMS_OUTPUT.PUT_LINE(rec.nom || ' ' || rec.prenom || ' n''a publié aucun contenu.');
  END LOOP;
END;
/`,why:`Même schéma que les régions vides. DISTINCT dans le sous-select est inutile pour NOT IN mais fidèle au corrigé du TD.`,checks:[{id:`u`,label:`FROM utilisateur`,points:1,match:/from\s+utilisateur\b/},{id:`n`,label:`NOT IN ou NOT EXISTS sur contenu`,points:1,match:/not\s+in\s*\([\s\S]{0,120}contenu|not\s+exists\s*\([\s\S]{0,160}contenu/},{id:`p`,label:`PUT_LINE`,points:1,match:/put_line/}]},{kind:`code`,id:`b5`,prompt:`5. Tente d'insérer la langue 'Fon' (code FO, description 'Langue du Bénin'). Si elle existe déjà (comparaison sans tenir compte de la casse), affiche un message, sinon insère avec SEQ_LANGUE.`,solution:`DECLARE
  v_count NUMBER;
  v_nom   VARCHAR2(50) := 'Fon';
BEGIN
  SELECT COUNT(*) INTO v_count
    FROM langue
   WHERE UPPER(nom_langue) = UPPER(v_nom);
  IF v_count > 0 THEN
    DBMS_OUTPUT.PUT_LINE('Langue ' || v_nom || ' existe déjà.');
  ELSE
    INSERT INTO langue (id_langue, nom_langue, code_langue, description)
    VALUES (seq_langue.NEXTVAL, v_nom, 'FO', 'Langue du Bénin');
    DBMS_OUTPUT.PUT_LINE('Langue ' || v_nom || ' insérée.');
  END IF;
END;
/`,why:`COUNT puis IF. UPPER des deux côtés. Ce n'est pas un trigger : le sujet dit « tenter » dans un script.`,checks:[{id:`c`,label:`COUNT dans langue`,points:1,match:/count\s*\([\s\S]{0,40}into[\s\S]{0,80}from\s+langue\b/},{id:`u`,label:`UPPER pour la casse`,points:1,match:/upper\s*\(/},{id:`i`,label:`INSERT INTO langue`,points:1,match:/insert\s+into\s+langue\b/},{id:`s`,label:`seq_langue.NEXTVAL`,points:1,match:/seq_langue\s*\.\s*nextval/}]},{kind:`code`,id:`b6`,prompt:`6. Affiche tous les commentaires dont le texte contient le mot culture, sans tenir compte de la casse.`,solution:`DECLARE
  v_mot VARCHAR2(20) := 'culture';
BEGIN
  FOR rec IN (
    SELECT texte, id_contenu
      FROM commentaire
     WHERE LOWER(texte) LIKE '%' || LOWER(v_mot) || '%'
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Commentaire sur contenu #' || rec.id_contenu || ' : ' || rec.texte);
  END LOOP;
END;
/`,why:`LIKE avec % des deux côtés. LOWER sur la colonne et sur le mot.`,checks:[{id:`l`,label:`LIKE`,points:1,match:/like\s+'/},{id:`w`,label:`LOWER`,points:1,match:/lower\s*\(/},{id:`c`,label:`culture`,points:1,match:/culture/},{id:`p`,label:`PUT_LINE`,points:1,match:/put_line/}]}]},{id:`blanc-bibliotheque`,title:`Examen blanc — bibliothèque`,context:`Même barème qu'une étude de cas, autre métier`,minutes:55,level:`contrôle`,intro:`Tu réutilises la méthode du parcours : table, trigger d'interdiction, fonction de comptage, procédure d'action. Un emprunt est ouvert tant que date_retour est NULL.`,schemaTitle:`Modèle`,schema:`Auteur(id_auteur, nom, prenom)
Ouvrage(id_ouvrage, titre, #id_auteur, annee, genre)
Lecteur(id_lecteur, nom, email)
Emprunt(id_emprunt, #id_ouvrage, #id_lecteur, date_emprunt, date_retour)`,questions:[{kind:`mcq`,id:`bb0`,points:1,prompt:`date_retour NULL signifie, dans ce sujet…`,choices:[{id:`a`,text:`Le livre est perdu et la ligne doit être détruite`},{id:`b`,text:`L'emprunt est encore ouvert`},{id:`c`,text:`La FK est cassée`},{id:`d`,text:`Oracle refuse la ligne`}],answer:`b`,why:`NULL n'est pas une erreur ici : la colonne est facultative tant que le livre n'est pas rendu.`},{kind:`code`,id:`bb1`,prompt:`1. CREATE TABLE emprunt. PK, deux FK, date_emprunt obligatoire défaut SYSDATE, date_retour facultative, et si elle est remplie elle ne peut pas précéder date_emprunt.`,solution:`CREATE TABLE emprunt (
  id_emprunt   NUMBER PRIMARY KEY,
  id_ouvrage   NUMBER NOT NULL,
  id_lecteur   NUMBER NOT NULL,
  date_emprunt DATE DEFAULT SYSDATE NOT NULL,
  date_retour  DATE,
  CONSTRAINT fk_e_o FOREIGN KEY (id_ouvrage) REFERENCES ouvrage (id_ouvrage),
  CONSTRAINT fk_e_l FOREIGN KEY (id_lecteur) REFERENCES lecteur (id_lecteur),
  CONSTRAINT ck_e_dates CHECK (date_retour IS NULL OR date_retour >= date_emprunt)
);`,why:`Le CHECK doit autoriser NULL, sinon aucun emprunt ouvert ne passerait.`,checks:[{id:`c`,label:`CREATE TABLE emprunt`,points:1,match:/create\s+table\s+emprunt\b/},{id:`f`,label:`Deux REFERENCES`,points:1,match:/references\s+ouvrage\s*\([\s\S]{0,200}references\s+lecteur\s*\(/},{id:`k`,label:`CHECK sur les dates`,points:1,match:/check\s*\([\s\S]{0,100}date_retour/}]},{kind:`code`,id:`bb2`,prompt:`2. Trigger TRG_UnSeulOuvert : interdit d'emprunter un ouvrage qui a déjà un emprunt sans date de retour.`,solution:`CREATE OR REPLACE TRIGGER trg_unseulouvert
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
/`,why:`BEFORE INSERT. On compte les emprunts ouverts du même ouvrage. Ce SELECT sur la table du trigger peut lever ORA-04091 : si ton correcteur est strict, dis-le et propose une contrainte différée ou un contrôle dans la procédure d'emprunt. Pour ce sujet, la forme COUNT est celle attendue en L3.`,checks:[{id:`t`,label:`Trigger TRG_UnSeulOuvert`,points:1,match:/trigger\s+trg_unseulouvert\b/},{id:`b`,label:`BEFORE INSERT FOR EACH ROW`,points:1,match:/before\s+insert[\s\S]{0,80}for\s+each\s+row/},{id:`n`,label:`date_retour IS NULL`,points:1,match:/date_retour\s+is\s+null/},{id:`r`,label:`RAISE`,points:1,match:/raise/}]},{kind:`code`,id:`bb3`,prompt:`3. Fonction NbOuverts(p_lecteur) : nombre d'emprunts encore ouverts de ce lecteur.`,solution:`CREATE OR REPLACE FUNCTION nbouverts (p_lecteur IN lecteur.id_lecteur%TYPE)
RETURN NUMBER IS
  v_n NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_n
    FROM emprunt
   WHERE id_lecteur = p_lecteur
     AND date_retour IS NULL;
  RETURN v_n;
END;
/`,why:`Même COUNT que la fonction « nombre de contenus », avec le filtre métier date_retour IS NULL.`,checks:[{id:`f`,label:`Fonction NbOuverts`,points:1,match:/function\s+nbouverts\b/},{id:`r`,label:`RETURN NUMBER`,points:1,match:/return\s+number\b/},{id:`c`,label:`COUNT des emprunts ouverts`,points:1,match:/date_retour\s+is\s+null/}]},{kind:`code`,id:`bb4`,prompt:`4. Procédure Rendre(p_emprunt) : pose date_retour à SYSDATE. Erreur si l'emprunt n'existe pas ou est déjà rendu.`,solution:`CREATE OR REPLACE PROCEDURE rendre (p_emprunt IN emprunt.id_emprunt%TYPE) IS
BEGIN
  UPDATE emprunt
     SET date_retour = SYSDATE
   WHERE id_emprunt = p_emprunt
     AND date_retour IS NULL;
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20101, 'Emprunt introuvable ou déjà rendu.');
  END IF;
END;
/`,why:`Le AND date_retour IS NULL fait d'une pierre deux coups : déjà rendu et introuvable donnent ROWCOUNT 0.`,checks:[{id:`p`,label:`Procédure Rendre`,points:1,match:/procedure\s+rendre\b/},{id:`u`,label:`UPDATE date_retour = SYSDATE`,points:1,match:/update\s+emprunt[\s\S]{0,120}date_retour\s*=\s*sysdate/},{id:`z`,label:`SQL%ROWCOUNT ou test d'absence`,points:1,match:/sql%rowcount|raise_application_error/}]},{kind:`code`,id:`bb5`,prompt:`5. Vue V_Auteurs_Emprunts : nom de l'auteur et nombre total d'emprunts de ses ouvrages, y compris les auteurs jamais empruntés (0).`,solution:`CREATE OR REPLACE VIEW v_auteurs_emprunts AS
SELECT a.id_auteur, a.nom,
       COUNT(e.id_emprunt) AS nb
  FROM auteur a
  LEFT JOIN ouvrage o ON o.id_auteur = a.id_auteur
  LEFT JOIN emprunt e ON e.id_ouvrage = o.id_ouvrage
 GROUP BY a.id_auteur, a.nom;`,why:`Deux LEFT JOIN. COUNT sur la clé d'emprunt, pas COUNT(*), sinon les auteurs sans livre compteraient 1.`,checks:[{id:`v`,label:`Vue demandée`,points:1,match:/view\s+v_auteurs_emprunts\b/},{id:`l`,label:`LEFT JOIN`,points:1,match:/left\s+(outer\s+)?join/},{id:`c`,label:`COUNT d'une clé d'emprunt`,points:1,match:/count\s*\(\s*e\.id_emprunt\s*\)/}]}]},{id:`blanc-clinique`,title:`Examen blanc — consultations`,context:`Même gestes, métier clinique`,minutes:50,level:`contrôle`,intro:`Tarif strictement positif. Une consultation appartient à un médecin et à un patient. La séquence s'appelle SEQ_CONSULT.`,schemaTitle:`Modèle`,schema:`Medecin(id_medecin, nom, specialite)
Patient(id_patient, nom, prenom, date_naissance)
Consultation(id_consult, #id_medecin, #id_patient, date_consult, motif, tarif)`,questions:[{kind:`code`,id:`c1`,prompt:`1. Table consultation : PK, deux FK, date obligatoire, motif VARCHAR2(200), tarif NUMBER sans défaut. Les tables medecin et patient existent.`,solution:`CREATE TABLE consultation (
  id_consult   NUMBER PRIMARY KEY,
  id_medecin   NUMBER NOT NULL,
  id_patient   NUMBER NOT NULL,
  date_consult DATE NOT NULL,
  motif        VARCHAR2(200),
  tarif        NUMBER,
  CONSTRAINT fk_cs_med FOREIGN KEY (id_medecin) REFERENCES medecin (id_medecin),
  CONSTRAINT fk_cs_pat FOREIGN KEY (id_patient) REFERENCES patient (id_patient)
);`,why:`Même squelette que contenu ou emprunt. Le tarif sera borné par le trigger, pas par un défaut.`,checks:[{id:`t`,label:`CREATE TABLE consultation`,points:1,match:/create\s+table\s+consultation\b/},{id:`m`,label:`FK médecin`,points:1,match:/references\s+medecin\s*\(/},{id:`p`,label:`FK patient`,points:1,match:/references\s+patient\s*\(/},{id:`d`,label:`date_consult NOT NULL`,points:1,match:/date_consult\s+date\s+not\s+null/}]},{kind:`code`,id:`c2`,prompt:`2. Séquence SEQ_CONSULT qui commence à 1 et augmente de 1, sans cycle et sans plafond.`,solution:`CREATE SEQUENCE seq_consult START WITH 1 INCREMENT BY 1 NOCYCLE;`,why:`NOCYCLE est le défaut, l'écrire montre que tu as lu « sans cycle ». Pas de MAXVALUE.`,checks:[{id:`s`,label:`CREATE SEQUENCE seq_consult`,points:1,match:/create\s+sequence\s+seq_consult\b/},{id:`i`,label:`Départ 1 pas 1`,points:1,match:/start\s+with\s+1\b/}]},{kind:`code`,id:`c3`,prompt:`3. Trigger TRG_Tarif_Positif, BEFORE INSERT OR UPDATE, qui refuse un tarif NULL ou ≤ 0.`,solution:`CREATE OR REPLACE TRIGGER trg_tarif_positif
BEFORE INSERT OR UPDATE ON consultation
FOR EACH ROW
BEGIN
  IF :NEW.tarif IS NULL OR :NEW.tarif <= 0 THEN
    RAISE_APPLICATION_ERROR(-20200, 'Tarif strictement positif obligatoire.');
  END IF;
END;
/`,why:`INSERT OR UPDATE : sinon un UPDATE pourrait poser un tarif nul après un INSERT valide.`,checks:[{id:`t`,label:`Trigger nommé`,points:1,match:/trigger\s+trg_tarif_positif\b/},{id:`b`,label:`BEFORE INSERT OR UPDATE`,points:1,match:/before\s+insert\s+or\s+update/},{id:`r`,label:`RAISE si tarif invalide`,points:1,match:/:new\.tarif[\s\S]{0,80}raise|raise[\s\S]{0,80}:new\.tarif/}]},{kind:`code`,id:`c4`,prompt:`4. Vue V_Tarif_Specialite : spécialité et tarif moyen des consultations, arrondi à 2 décimales.`,solution:`CREATE OR REPLACE VIEW v_tarif_specialite AS
SELECT m.specialite, ROUND(AVG(c.tarif), 2) AS tarif_moyen
  FROM medecin m
  JOIN consultation c ON c.id_medecin = m.id_medecin
 GROUP BY m.specialite;`,why:`AVG puis ROUND, comme la moyenne des notes du TD. GROUP BY spécialité.`,checks:[{id:`v`,label:`Vue V_Tarif_Specialite`,points:1,match:/view\s+v_tarif_specialite\b/},{id:`a`,label:`ROUND(AVG(...), 2)`,points:1,match:/round\s*\(\s*avg\s*\([\s\S]{0,40}\)\s*,\s*2\s*\)/},{id:`g`,label:`GROUP BY specialite`,points:1,match:/group\s+by\s+m?\.?specialite\b/}]},{kind:`code`,id:`c5`,prompt:`5. Fonction NbConsultPatient(p_id) : nombre de consultations du patient.`,solution:`CREATE OR REPLACE FUNCTION nbconsultpatient (p_id IN patient.id_patient%TYPE)
RETURN NUMBER IS
  v_n NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_n FROM consultation WHERE id_patient = p_id;
  RETURN v_n;
END;
/`,why:`Le patron COUNT INTO, filtré par la FK du patient.`,checks:[{id:`f`,label:`Fonction NbConsultPatient`,points:1,match:/function\s+nbconsultpatient\b/},{id:`c`,label:`COUNT INTO`,points:1,match:/count\s*\(\s*\*\s*\)\s+into/},{id:`w`,label:`WHERE id_patient`,points:1,match:/where\s+id_patient\s*=/}]},{kind:`code`,id:`c6`,prompt:`6. Procédure Planifier(p_medecin, p_patient, p_date, p_motif, p_tarif) : insère avec SEQ_CONSULT.NEXTVAL et confirme par DBMS_OUTPUT.`,solution:`CREATE OR REPLACE PROCEDURE planifier (
  p_medecin IN consultation.id_medecin%TYPE,
  p_patient IN consultation.id_patient%TYPE,
  p_date    IN consultation.date_consult%TYPE,
  p_motif   IN consultation.motif%TYPE,
  p_tarif   IN consultation.tarif%TYPE
) IS
  v_id consultation.id_consult%TYPE;
BEGIN
  v_id := seq_consult.NEXTVAL;
  INSERT INTO consultation (id_consult, id_medecin, id_patient, date_consult, motif, tarif)
  VALUES (v_id, p_medecin, p_patient, p_date, p_motif, p_tarif);
  DBMS_OUTPUT.PUT_LINE('Consultation ' || v_id || ' planifiée.');
END;
/`,why:`Même procédure que AJOUTER_EMPLOYE. Le trigger vérifiera le tarif tout seul.`,checks:[{id:`p`,label:`Procédure Planifier`,points:1,match:/procedure\s+planifier\b/},{id:`n`,label:`seq_consult.NEXTVAL`,points:1,match:/seq_consult\s*\.\s*nextval/},{id:`i`,label:`INSERT INTO consultation`,points:1,match:/insert\s+into\s+consultation\b/},{id:`o`,label:`DBMS_OUTPUT`,points:1,match:/dbms_output\s*\.\s*put_line/}]}]},{id:`blanc-stocks`,title:`Examen blanc — stocks et commandes`,context:`Lignes de commande, seuil, livraison`,minutes:50,level:`contrôle`,intro:`La clé de ligne_commande est le couple (id_commande, id_produit). Le stock baisse à l'insertion de la ligne, et seulement si la quantité tient dans le stock.`,schemaTitle:`Modèle`,schema:`Produit(id_produit, libelle, stock, seuil)
Commande(id_commande, date_commande, statut)
Ligne(#id_commande, #id_produit, qte)`,questions:[{kind:`mcq`,id:`st0`,points:1,prompt:`Pourquoi la clé primaire de ligne est-elle (id_commande, id_produit) ?`,choices:[{id:`a`,text:`Parce qu'Oracle interdit les clés sur une seule colonne`},{id:`b`,text:`Parce qu'une commande ne doit pas contenir deux fois le même produit`},{id:`c`,text:`Parce que qte ne peut pas être NULL`},{id:`d`,text:`Parce que c'est une vue`}],answer:`b`,why:`Le couple identifie la ligne. Deux produits différents dans la même commande restent possibles.`},{kind:`code`,id:`st1`,prompt:`1. Tables commande et ligne. Commande : id PK, date défaut SYSDATE, statut VARCHAR2(20). Ligne : PK composée, qte > 0, deux FK.`,solution:`CREATE TABLE commande (
  id_commande   NUMBER PRIMARY KEY,
  date_commande DATE DEFAULT SYSDATE NOT NULL,
  statut        VARCHAR2(20) DEFAULT 'ouverte'
);

CREATE TABLE ligne (
  id_commande NUMBER NOT NULL,
  id_produit  NUMBER NOT NULL,
  qte         NUMBER NOT NULL,
  CONSTRAINT pk_ligne PRIMARY KEY (id_commande, id_produit),
  CONSTRAINT fk_li_co FOREIGN KEY (id_commande) REFERENCES commande (id_commande),
  CONSTRAINT fk_li_pr FOREIGN KEY (id_produit) REFERENCES produit (id_produit),
  CONSTRAINT ck_qte CHECK (qte > 0)
);`,why:`CHECK (qte > 0) est légal : la condition ne sort pas de la ligne. Le stock, lui, est dans une autre table : ce sera le trigger.`,checks:[{id:`c`,label:`Table commande`,points:1,match:/create\s+table\s+commande\b/},{id:`l`,label:`Table ligne`,points:1,match:/create\s+table\s+ligne\b/},{id:`pk`,label:`PK (id_commande, id_produit)`,points:1,match:/primary\s+key\s*\(\s*id_commande\s*,\s*id_produit\s*\)/},{id:`q`,label:`CHECK qte > 0`,points:1,match:/check\s*\(\s*qte\s*>\s*0\s*\)/}]},{kind:`code`,id:`st2`,prompt:`2. Trigger TRG_Sortie_Stock, BEFORE INSERT ON ligne : si stock < qte, erreur ; sinon décrémente produit.stock de :NEW.qte.`,solution:`CREATE OR REPLACE TRIGGER trg_sortie_stock
BEFORE INSERT ON ligne
FOR EACH ROW
DECLARE
  v_stock produit.stock%TYPE;
BEGIN
  SELECT stock INTO v_stock FROM produit WHERE id_produit = :NEW.id_produit FOR UPDATE;
  IF v_stock < :NEW.qte THEN
    RAISE_APPLICATION_ERROR(-20300, 'Stock insuffisant.');
  END IF;
  UPDATE produit SET stock = stock - :NEW.qte WHERE id_produit = :NEW.id_produit;
END;
/`,why:`On lit produit, pas ligne : pas de table mutante. FOR UPDATE évite deux ventes simultanées du même reste, bonus apprécié.`,checks:[{id:`t`,label:`Trigger TRG_Sortie_Stock`,points:1,match:/trigger\s+trg_sortie_stock\b/},{id:`b`,label:`BEFORE INSERT FOR EACH ROW`,points:1,match:/before\s+insert[\s\S]{0,80}for\s+each\s+row/},{id:`s`,label:`Lecture du stock produit`,points:1,match:/from\s+produit\b/},{id:`u`,label:`UPDATE du stock`,points:1,match:/update\s+produit\s+set\s+stock\s*=/},{id:`r`,label:`RAISE si insuffisant`,points:1,match:/raise/}]},{kind:`code`,id:`st3`,prompt:`3. Vue V_Sous_Seuil : produits dont le stock est strictement inférieur au seuil. Colonnes libellé, stock, seuil.`,solution:`CREATE OR REPLACE VIEW v_sous_seuil AS
SELECT libelle, stock, seuil
  FROM produit
 WHERE stock < seuil;`,why:`Pas d'agrégat : un simple filtre. Strictement inférieur, comme l'énoncé.`,checks:[{id:`v`,label:`Vue V_Sous_Seuil`,points:1,match:/view\s+v_sous_seuil\b/},{id:`w`,label:`stock < seuil`,points:1,match:/where\s+stock\s*<\s*seuil\b/}]},{kind:`code`,id:`st4`,prompt:`4. Fonction Valeur_Stock : somme de stock * 1 pour tous les produits, en réalité somme des stocks (le sujet ne donne pas de prix). Retourne 0 si la table est vide. Nom exact : valeur_stock, sans paramètre.`,solution:`CREATE OR REPLACE FUNCTION valeur_stock
RETURN NUMBER IS
  v_s NUMBER;
BEGIN
  SELECT NVL(SUM(stock), 0) INTO v_s FROM produit;
  RETURN v_s;
END;
/`,why:`SUM d'aucune ligne vaut NULL. NVL(..., 0) répond à « retourne 0 si vide ». Pas de paramètre : la parenthèse peut être omise.`,checks:[{id:`f`,label:`Fonction valeur_stock`,points:1,match:/function\s+valeur_stock\b/},{id:`s`,label:`SUM(stock)`,points:1,match:/sum\s*\(\s*stock\s*\)/},{id:`n`,label:`NVL pour le vide`,points:1,match:/nvl\s*\(/}]},{kind:`code`,id:`st5`,prompt:`5. Procédure Livrer(p_commande) : passe le statut à 'livrée' seulement si la commande existe et n'est pas déjà livrée. Sinon, exception explicite.`,solution:`CREATE OR REPLACE PROCEDURE livrer (p_commande IN commande.id_commande%TYPE) IS
BEGIN
  UPDATE commande
     SET statut = 'livrée'
   WHERE id_commande = p_commande
     AND LOWER(NVL(statut, 'x')) <> 'livrée';
  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20301, 'Commande introuvable ou déjà livrée.');
  END IF;
END;
/`,why:`Même patron que Rendre et MISE_A_JOUR : UPDATE conditionnel puis ROWCOUNT.`,checks:[{id:`p`,label:`Procédure Livrer`,points:1,match:/procedure\s+livrer\b/},{id:`u`,label:`UPDATE commande statut livrée`,points:1,match:/update\s+commande[\s\S]{0,120}livr[eé]e/},{id:`r`,label:`RAISE si rien n'a bougé`,points:1,match:/sql%rowcount|raise_application_error/}]}]},{id:`pieges`,title:`Express — les pièges qui reviennent`,context:`20 minutes, zéro rédaction longue`,minutes:20,level:`échauffement`,intro:`Questions courtes tirées des copies ratées : mauvais SGBD, mauvais objet, TRUNC, :NEW, slash. Le dernier item est un micro-script.`,questions:[{kind:`mcq`,id:`p1`,points:1,prompt:`TRUNCATE(15.9) — attention au mot.`,choices:[{id:`a`,text:`C'est valide et vaut 15`},{id:`b`,text:`TRUNCATE(nombre) n'existe pas ; la fonction est TRUNC, et TRUNCATE TABLE est un ordre DDL`},{id:`c`,text:`Ça arrondit à 16`},{id:`d`,text:`Ça supprime la table nommée 15.9`}],answer:`b`,why:`Le cours insiste sur TRUNC. TRUNCATE sans TABLE n'est pas la fonction numérique.`},{kind:`mcq`,id:`p2`,points:1,prompt:`Où le deux-points de :NEW est-il interdit ?`,choices:[{id:`a`,text:`Dans le corps du trigger`},{id:`b`,text:`Dans la clause WHEN ( ... ) du trigger, où l'on écrit NEW.col`},{id:`c`,text:`Nulle part, les deux formes sont identiques`},{id:`d`,text:`Dans RAISE_APPLICATION_ERROR`}],answer:`b`,why:`WHEN (NEW.statut = 'validé') sans deux-points. Dans BEGIN, :NEW.statut avec deux-points.`},{kind:`mcq`,id:`p3`,points:1,prompt:`CREATE OR REPLACE PROCEDURE f RETURN NUMBER IS …`,choices:[{id:`a`,text:`Correct pour une fonction`},{id:`b`,text:`Incorrect : une procédure n'a pas RETURN NUMBER dans la signature`},{id:`c`,text:`Correct si on ajoute FOR EACH ROW`},{id:`d`,text:`C'est un trigger`}],answer:`b`,why:`RETURN type appartient à FUNCTION. Mélanger les deux mots coûte l'objet entier.`},{kind:`mcq`,id:`p4`,points:1,prompt:`Un CHECK peut-il vérifier que le contenu commenté a le statut valide ?`,choices:[{id:`a`,text:`Oui, CHECK (contenu.statut = 'valide')`},{id:`b`,text:`Non : CHECK ne lit pas une autre table. Il faut un trigger`},{id:`c`,text:`Oui, avec un JOIN dans le CHECK`},{id:`d`,text:`Oui, si la colonne s'appelle note`}],answer:`b`,why:`C'est la frontière la plus notée du cours entre contrainte et trigger.`},{kind:`mcq`,id:`p5`,points:1,prompt:`AFTER INSERT … :NEW.date_validation := SYSDATE; sur la table qui vient d'être mise à jour.`,choices:[{id:`a`,text:`La date est bien enregistrée`},{id:`b`,text:`Trop tard : il fallait BEFORE pour modifier :NEW`},{id:`c`,text:`Il faut un COMMIT dans le trigger`},{id:`d`,text:`SYSDATE est interdit dans un trigger`}],answer:`b`,why:`Après l'ordre, changer :NEW n'écrit plus la colonne.`},{kind:`mcq`,id:`p6`,points:1,prompt:`SELECT COUNT(*) FROM contenu; écrit tel quel entre BEGIN et END.`,choices:[{id:`a`,text:`Affiche le nombre`},{id:`b`,text:`Ne compile pas : il faut SELECT … INTO, ou un curseur`},{id:`c`,text:`Équivaut à DBMS_OUTPUT`},{id:`d`,text:`Vide la table`}],answer:`b`,why:`PL/SQL n'affiche pas un SELECT nu. INTO pour une valeur, FOR pour plusieurs lignes.`},{kind:`mcq`,id:`p7`,points:1,prompt:`GRANT DBA TO ecole; sans CREATE USER préalable.`,choices:[{id:`a`,text:`Crée l'utilisateur et lui donne DBA`},{id:`b`,text:`Échoue : ecole n'existe pas encore`},{id:`c`,text:`Crée un rôle ecole`},{id:`d`,text:`Donne DBA à tout le monde`}],answer:`b`,why:`L'ordre du devoir est CREATE USER puis GRANT. L'inverse ne devine pas le compte.`},{kind:`code`,id:`p8`,prompt:`8. Écris seulement le trigger qui interdit une note de commentaire en dehors de 0..5. Nom : TRG_Note. Table : commentaire. Colonne : note.`,solution:`CREATE OR REPLACE TRIGGER trg_note
BEFORE INSERT OR UPDATE ON commentaire
FOR EACH ROW
BEGIN
  IF :NEW.note IS NULL OR :NEW.note NOT BETWEEN 0 AND 5 THEN
    RAISE_APPLICATION_ERROR(-20400, 'Note entre 0 et 5.');
  END IF;
END;
/`,why:`Le geste le plus rentable de l'UE, réécrit de mémoire. OR UPDATE empêche aussi de corriger une note vers 12.`,checks:[{id:`t`,label:`TRIGGER trg_note`,points:1,match:/trigger\s+trg_note\b/},{id:`b`,label:`BEFORE … FOR EACH ROW`,points:1,match:/before\s+insert[\s\S]{0,80}for\s+each\s+row/},{id:`n`,label:`:NEW.note et RAISE`,points:1,match:/:new\.note[\s\S]{0,100}raise/}]}]}];function t(t){return e.find(e=>e.id===t)}export{e as n,t};