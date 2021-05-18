const initialState = [
    {
        id: 'Math_123454321e1',
        item: 'Математика',
        itemEng: 'Mathematics',
        grades: [],
        gradesSum: 0,
        color: '#ff4646',
        type: 'exact',
        Abbreviation: 'Мат',
        AbbreviationEng: 'Math',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Економіст',
            nameEng: 'Economist',
            description: 'фахівець, який займається аналізом фінансово-господарської діяльності (підприємства, галузі і т.д.) з метою її поліпшення. Економіст бере участь в системі планування бюджету організації і здійснює контроль його витрачання, проводить аудит, а нерідко і сам займається бухгалтерським обліком.',
            descriptionEng: 'a specialist engaged in the analysis of financial and economic activities (enterprises, industries, etc.) in order to improve it. The economist participates in the organizations budget planning system and controls its spending, conducts audits, and often engages in accounting. финансово-хозяйственной деятельности (предприятия, отрасли и т.д.) в целях ее улучшения. Экономист принимает участие в системе планирования бюджета организации и осуществляет контроль его расходования, проводит аудит, а нередко и сам занимается бухгалтерским учетом.',

            image: require('../../../assets/proffessions/economist.jpg')
          },
          {
            name: 'Логіст',
            nameEng: 'Logistician',
            description: 'Логіст - фахівець, який займається оптимізацією процесів доставки, зберігання і відвантаження товару і організацією самого процесу перевезення. Він відповідає за організацію, планування і управління рухом матеріальних ресурсів. Головна мета логіста - доставити продукцію в заданий місце в певний день і годину, в потрібній кількості і асортименті при оптимальному рівні витрат, зі збереженням її якості.',
            descriptionEng: 'Logistician - a specialist who optimizes the processes of delivery, storage and shipment of goods and the organization of the transportation process. He is responsible for organizing, planning and managing the movement of material resources. The main goal of the logistician is to deliver the products to the given place in a certain day and hour, in the right quantity and range at the optimal level of costs, while maintaining its quality.',
            image: require('../../../assets/proffessions/logist.png')
          },
          {
            name: 'Математик',
            nameEng: 'Mathematician',
            description: 'Математик проводить математичні дослідження для вирішення науково-технічних та виробничих проблем. Вивчає теоретичні об’єкти математики та розробляє методи розв’язування задач з використанням обчислювальних методів та обчислювально-технічних засобів. Він також займається вирішенням теоретичних задач з математики, тобто побудовою математичних моделей (кількісних характеристик реальних речей) для вивчення життєвих процесів; проведення досліджень у різних галузях математичної науки з метою пошуку нових законів та закономірностей досліджуваного явища, процесу. Математики працюють у промисловості, спеціалізованих науково-практичних організаціях (науково-дослідні інститути, науково-виробничі, обчислювальні центри), в навчальних закладах як викладачі (школи, коледжі, технікуми, університети) та в оборонній промисловості. Для ефективної роботи математику потрібні математичні та аналітичні навички, логічне мислення, високий рівень розвитку концентрації та стійкості уваги, хороший розвиток короткочасної пам’яті, пам’ять на цифри та символи, просторова уява. Важлива схильність до аналізу, деталізація інформації та схильність до дослідницької роботи. Величезне значення мають такі якості, як ерудиція, допитливість, методичність, терплячість.',
            descriptionEng: 'The mathematician conducts mathematical research to solve scientific, technical and industrial problems. He studies theoretical objects of mathematics and develops methods for solving problems using computational methods and computational and technical means. He also deals with the solution of theoretical problems in mathematics, i.e. the construction of mathematical models (quantitative characteristics of real things) for the study of life processes; conducting research in various fields of mathematical science in order to search for new laws and patterns of the studied phenomenon, process. Mathematicians work in industry, specialized scientific and practical organizations (research institutes, research and production, computing centers), in educational institutions as teachers (schools , colleges, technical schools, universities) and in the defense industry. For effective work, a mathematician needs mathematical and analytical skills, logical thinking, a high level of development of concentration and stability of attention, good development of short-term memory, memory for numbers and symbols, spatial imagination. A penchant for analysis, detailing information and a penchant for research work are important. Such qualities as erudition, curiosity, methodicalness, patience are of great importance.',
            image: require('../../../assets/proffessions/mathematic.jpg')
          },
          {
            name: 'Бухгалтер',
            nameEng: 'Accountant',
            description: 'Бухгалтер здійснює бухгалтерський облік фінансових коштів підприємства, ревізію і фінансовий контроль, перевіряє достовірність отриманої інформації, контролює дотримання законності при витрачанні фінансових коштів. Він нараховує заробітну плату співробітникам організації, веде облік матеріальних цінностей, проводить розрахунок собівартості продукції або податкових відрахувань, здійснює розрахунки з постачальниками та субпідрядниками. Також він готує звітність організації і надає її до контролюючих органів (податкові інспекції, державні фонди). Зазвичай бухгалтер спеціалізується на одній з функцій бухгалтерського обліку, однак орієнтуватися повинен у всіх його видах. Ці фахівці можуть працювати в бухгалтерії будь-якої установи або організації, в великих фірмах і банках, на підприємствах у відділах економічного планування та аналізу.',
            descriptionEng: 'The accountant carries out accounting of the company financial resources, audit and financial control, verifies the accuracy of the information received, monitors compliance with the law when spending financial resources. He calculates the salaries of employees of the organization, keeps records of material assets, calculates the cost of production or tax deductions, makes settlements with suppliers and subcontractors. He also prepares the reporting of the organization and submits it to the regulatory authorities (tax inspectorates, state funds). Usually an accountant specializes in one of the accounting functions, but must be guided in all its types. These specialists can work in the accounting department of any institution or organization, in large firms and banks, in enterprises in the departments of economic planning and analysis.',
            image: require('../../../assets/proffessions/accountant.jpg')
          },
          {
            name: 'Программист',
            nameEng: 'Programmer',
            description: 'Програміст працює в області проектування, виробництва і експлуатації програмних засобів на базі сучасних інформаційних технологій. Основне завдання програміста - розробка програм на основі забезпечують виконання цих алгоритмів і завдань засобами обчислювальної техніки. В обовязки програміста входить розробка технології, етапів і послідовності вирішення завдань; вибір мови програмування і переклад на нього використовуваних моделей і алгоритмів задач; визначення інформації для обробки на ЕОМ (її обсяг, структура, макети і схеми введення, спосіб збереження і відтворення). Програміст готує програми до налагодження і проводить налагодження, перевіряє програми на основі логічного аналізу, коригує їх у процесі доопрацювання. Супроводжує впроваджені програми і програмні засоби. Розробляє інструкції по роботі з програмами, оформляє необхідну технічну документацію.',
            descriptionEng: 'The programmer works in the design, production and operation of software based on modern information technologies. The main task of the programmer is the development of programs based on computer technology that ensures the execution of these algorithms and tasks. The responsibilities of the programmer include the development of technology, stages and sequence of problem solving; selection of a programming language and translation of the used models and algorithms of tasks into it; determination of information for processing on a computer (its volume, structure, layouts and input schemes, storage and playback method). The programmer prepares programs for debugging and conducts debugging, checks programs based on logical analysis, corrects them in the process of revision. Maintains the implemented programs and software tools. Develops instructions for working with programs, prepares the necessary technical documentation.',
            image: require('../../../assets/proffessions/programer.jpeg')
          },
          {
            name: 'Инженер',
            nameEng: 'Engineer',
            description: 'Інженерні професії - наймасовіші професії висококваліфікованої праці. Інженер бере участь у виробництві всіх матеріальних благ суспільства - від продуктів харчування і товарів повсякденного попиту до складних обчислювальних машин, космічних ракет, атомних підводних човнів. Сучасний інженер - це фахівець, що володіє високою культурою, яка добре знає сучасну техніку і технологію, економіку і організацію виробництва, що вміє користуватися інженерними методами при вирішенні інженерних задач і в той же час володіє здатністю ізобретательства.Інженери застосовують теорії та принципи різних наук в технічних і економічних рішеннях техніко-практичних проблем. Їх робота є як би сполучною ланкою між науковими відкриттями, розробками і їх практичним застосуванням. Вони керують виробничими ділянками на промислових підприємствах, в будівництві, сільському господарстві та інших галузях, працюють в конструкторських бюро, лабораторіях і науково-дослідних установах, займаються питаннями організації виробництва, планування та економіки. Інженери проектують технології, промислове обладнання, машини, беруть участь в проектуванні і розвитку систем контролю виробництва, автоматизації виробництва, бізнесі, процесах управління. Вони вивчають причини погіршення і збоїв виробництва, відчувають продукцію, визначаючи її якість і т.д.',
            descriptionEng: 'Engineering professions are the most widespread professions of highly skilled labor. An engineer takes part in the production of all material goods of society - from food and consumer goods to complex computers, space rockets, nuclear submarines. A modern engineer is a specialist with a high culture, well-versed in modern technology and technology, economics and organization of production, who knows how to use engineering methods in solving engineering problems and at the same time has the ability to invent. Engineers apply theories and principles of various sciences in technical and economic solutions to technical and practical problems. Their work is, as it were, a link between scientific discoveries, developments and their practical application. They manage production sites in industrial enterprises, in construction, agriculture and other industries, work in design bureaus, laboratories and research institutions, are involved in the organization of production, planning and economics. Engineers design technologies, industrial equipment, machines, participate in the design and development of production control systems, production automation, business, management processes. They study the causes of deterioration and disruptions in production, test products to determine their quality, etc.',
            image: require('../../../assets/proffessions/engeneer.jpg')
          }
        ]
    },
    {
        id: 'Eng_123454321e1',
        item: 'Англійська мова',
        itemEng: 'English',
        grades: [],
        gradesSum: 0,
        color: '#393e46',
        type: 'humanitarian',
        Abbreviation: 'Англ',
        AbbreviationEng: 'Eng',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name:'Бортпровідник / стюардеса',
            nameEng: 'Flight attendant / stewardess',
            description: 'Якщо вам не страшні перельоти і зміна часових поясів - спробуйте себе в якості бортпровідника / стюардеси. Робота передбачає багато подорожей, що надає особливої ​​романтичності цієї професії, але при цьому не позбавлена ​​і рутинних завдань (роздача напоїв, закусок, дозвіл різних ситуацій та інше). Регулярно перевіряйте розділ карєри на інтернет-сторінках різних авіакомпаній, поки не побачите оголошення про новий набір на відповідні курси. Далі вам потрібно пройти вступний тест, що визначає чи підходите ви морально і фізично на дану посаду. Хоча у вас і буде можливість спілкуватися з великою кількістю людей з різних куточків світу, ваше спілкування буде обмежено повторюваними діалогами.',
            descriptionEng: 'If you are not afraid of flights and changing time zones, try yourself as a flight attendant / stewardess. The work involves a lot of travel, which gives a special romance to this profession, but at the same time it is not devoid of routine tasks (serving drinks, snacks, resolving various situations, etc.). Check the career section of the various airlines webpages regularly until you see an announcement of a new recruitment for the respective courses. Next, you will need to pass an entrance test that determines whether you are mentally and physically fit for this position. Although you will be able to communicate with many people from different parts of the world, your communication will be limited to repetitive dialogues.',
            image: require('../../../assets/proffessions/stuart.jpg')
          },
          {
            name: 'Програміст',
            nameEng: 'Programmer',
            description: 'Програміст працює в області проектування, виробництва і експлуатації програмних засобів на базі сучасних інформаційних технологій. Основне завдання програміста - розробка програм на основі аналізу математичних моделей і алгоритмів для вирішення наукових, прикладних, економічних і інших завдань, що забезпечують виконання цих алгоритмів і завдань засобами обчислювальної техніки. В обовязки програміста входить розробка технології, етапів і послідовності вирішення завдань; вибір мови програмування і переклад на нього використовуваних моделей і алгоритмів задач; визначення інформації для обробки на ЕОМ (її обсяг, структура, макети і схеми введення, спосіб збереження і відтворення). Програміст готує програми до налагодження і проводить налагодження, перевіряє програми на основі логічного аналізу, коригує їх у процесі доопрацювання. Супроводжує впроваджені програми і програмні засоби. Розробляє інструкції по роботі з програмами, оформляє необхідну технічну документацію.',
            descriptionEng: 'The programmer works in the design, production and operation of software based on modern information technologies. The main task of the programmer is the development of programs based on computer technology that ensures the execution of these algorithms and tasks. The responsibilities of the programmer include the development of technology, stages and sequence of problem solving; selection of a programming language and translation of the used models and algorithms of tasks into it; determination of information for processing on a computer (its volume, structure, layouts and input schemes, storage and playback method). The programmer prepares programs for debugging and conducts debugging, checks programs based on logical analysis, corrects them in the process of revision. Maintains the implemented programs and software tools. Develops instructions for working with programs, prepares the necessary technical documentation.',
            image: require('../../../assets/proffessions/programer.jpeg')
          },
          {
            name:'Экскурсовод',
            nameEng: 'Guide',
            descriptionEng: 'The profession of a tour guide is popular with students and freelance staff for its networking and sightseeing opportunities. For this job, you will need good presentation skills and a good memory for facts, dates, and peoples names. In addition, you may have to spend the entire day on your feet to show the local park or take a long city tour. Extreme lovers who work with VIP clients can become guides to dangerous places using the budget of their clients.',
            description: 'Професія екскурсовода користується популярністю у студентів і позаштатних співробітників завдяки можливостям спілкування і огляду визначних памяток. Для цієї роботи вам знадобляться хороші навички презентації та хороша память на факти, дати та імена людей. Крім того, можливо, вам доведеться провести весь день на ногах, щоб показати місцевий парк або провести тривалу екскурсію по місту. Любителі екстриму, що працюють з VIP-клієнтами, можуть стати провідниками по небезпечних місцях, використовуючи бюджет своїх клієнтів.',
            image: require('../../../assets/proffessions/tourGuide.jpg')
          },
          {
            name:'Переводчик',
            nameEng: 'Translator',
            descriptionEng: 'So what is the best foreign language to learn to become a translator? According to this study, translators from Chinese to English have the highest hourly rate ($ 74.92). One of the advantages of this job is that you can work both at home and in the office. You can work full or part time depending on the amount of text that you can translate for it.',
            description: 'Отже, яку іноземну мову найкраще вивчити, щоб стати перекладачем? Згідно з цим дослідженням перекладачі з китайської на англійську мають найвищу погодинну ставку (74,92 $). Одна з переваг даної роботи полягає в тому, що ви можете працювати як вдома, так і в офісі. Працювати можна повний або неповний робочий день в залежності від обсягів тексту, які ви можете за нього перевести.',
            image: require('../../../assets/proffessions/translator.jpg')
          }
        ]
    },
    {
        id: 'rus_123454321e1',
        item: 'Російська мова',
        itemEng: 'Russian language',
        grades: [],
        gradesSum: 0,
        color: '#48466d',
        type: 'humanitarian',
        Abbreviation: 'Рос м',
        AbbreviationEng: 'Rus',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Диктор',
            nameEng: 'Speaker',
            descriptionEng: 'An announcer on radio and television reviews the news feed, highlights the main thing, edits the news, and prioritizes them. Expressively reads the texts of programs (in and behind the scenes), going on air or in the recording. Reading out the news or commenting on events, the announcer emphasizes the most important information, using his voice to correctly place accents. He can act as a presenter of some programs, interview guests of the studio, independently develop and conduct programs, take part in the creation of a script, commercials and announcements where voice-over skills are required. In addition, specialists provide voice overs for foreign programs and films. The profession is associated with public speaking. For a successful announcer, just a pleasant voice is not enough. Competent presentation of information, artistic taste, emotionality - all these characteristics are necessary for a specialist. The announcer should know the basics of acting and journalistic skills, master the technique of speech perfectly, have deep knowledge in the field of stylistics of the Russian (Belarusian) language. Professionally important qualities are good diction, developed logical thinking, good memory, erudition, sociability, relaxedness, stress resistance, quick reaction, resourcefulness.',
            description: 'Диктор на радіо і телебаченні здійснює огляд стрічки новин, виділяє головне, редагує новини, розставляє їх в пріоритетному порядку. Виразно читає тексти передач (в кадрі і за кадром), що йдуть в безпосередньому ефірі або в записі. Зачитуючи новини або коментуючи події, диктор підкреслює найбільш важливу інформацію, за допомогою голосу правильно розставляє акценти. Може виступати провідним деяких передач, брати інтервю у гостей студії, самостійно розробляти і вести передачі, брати участь у створенні сценарію, рекламних роликів та оголошень, де необхідні дикторський навички. Крім цього, фахівці озвучують закордонні програми і фільми.Профессія повязана з публічними виступами. Для успішного диктора тільки приємного голосу недостатньо. Грамотна подача інформації, художній смак, емоційність - все ці характеристики необхідні для фахівця. Диктор повинен знати основи акторської і журналістської майстерності, досконало володіти технікою мови, мати глибокі знання в області стилістики російської (білоруського) мови. Професійно важливими якостями є хороша дикція, розвинене логічне мислення, хороша память, ерудованість, комунікабельність, розкутість, стресостійкість, швидкість реакції, винахідливість.',
            image: require('../../../assets/proffessions/dictor.jpeg')
          },
          {
            name: 'Журналіст',
            nameEng: 'Journalist',
            descriptionEng: 'A journalist is a specialist who works in the mass media system and is engaged in journalistic activities. The duties of a journalist are to promptly collect, process, correctly and easily present relevant information. Within journalism specializations can be distinguished by type of activity, genre specialization: for example, a reporter, publicist, columnist, commentator, essayist, TV and radio host, etc. ... Journalists also include editors working for publishing houses, radio, television and Internet portals. All of them are participants in the information process. In addition, journalists usually specialize in a certain topic, and this division is called profiling: a journalist writing on political, economic, sports topics, specializing in the field of culture, family, criminal chronicle, social life, etc. ... Each of these types and types of journalists has its own specific features, characterized by a stable system of knowledge, skills, labor operations.',
            description: 'Журналіст - це фахівець, який працює в системі засобів масової інформаціїї займається публіцистичною діяльністю. Обовязки журналіста - оперативно зібрати, обробити, грамотно і доступно викласти актуальну інформацію.В рамках журналістських спеціальностей можна виділити спеціалізації за видами діяльності, жанрової спеціалізації: наприклад, репортер, публіцист, оглядач, коментатор, нарисовець, провідний теле- і радіопередачі тощо . До числа журналістів відносяться також редактори, які працюють у видавництвах, на радіо, телебаченні та інтернет-порталах. Всі вони - учасники інформаційного процесса.Кроме того, журналісти зазвичай спеціалізуються в певній тематиці, і такий розподіл називається профілюванням: журналіст, що пише на політичні, економічні, спортивні теми, що спеціалізується в галузі культури, сімї, кримінальної хроніки, світського життя і т.д . Кожен з цих типів і видів журналістів має свої специфічні риси, характеризується стійкою системою знань, навичок, трудових операцій.',
            image: require('../../../assets/proffessions/journalist.jpg')
          },
          {
            name: 'Філолог',
            nameEng: 'Philologist',
            descriptionEng: 'A philologist is, first of all, a person who learns a language. A language is a universal communication tool, perhaps the most amazing mechanism ever mastered by mankind. A philologist, first of all, is a person who learns a language. Language is a universal communication tool, perhaps the most amazing mechanism. ever mastered by humanity. The philologist comprehensively studies the functions and internal structure of language, its nature, historical development and classification. He is engaged in research activities, works on the creation of scientific papers, reviews, is engaged in the restoration and study of texts, conducts research on the study of connections between ancient languages ​​and modern language groups, the origin and evolution of words, grammatical and linguistic forms, conducts work on the unification of terms, improvement of concepts and definitions in the relevant branches of science, technology, national economy Philologists are of different directions: practitioners and theorists. Practitioners are constantly studying languages, making translations, expanding the structural framework of language. Unlike practitioners, theorists are engaged in the study of ancient and dead languages. In addition, theorists develop new rules, introduce new conventions, cleanse the language of parasitic words, and create dictionaries.',
            description: 'Філолог, перш за все, це людина, що вивчає язик.Язик - універсальний інструмент комунікації, мабуть, найдивовижніший механізмосвоенний коли-небудь человечеством.Філолог, перш за все, це людина, що вивчає язик.Язик - універсальний інструмент комунікації, мабуть, найдивовижніший механізм, освоєний коли-небудь человечеством.Філолог всебічно вивчає функції і внутрішню структуру мови, його природу, історичний розвиток та класифікацію. Він займається науково-дослідницькою діяльністю, працює над створенням наукових праць, рецензій, займається відновленням і вивченням текстів, проводить дослідження з вивчення звязків між древніми мовами і сучасними групами мов, походженню й еволюції слів, граматичних і мовних форм, проводить роботи по уніфікації термінів, вдосконалення понять і визначень по відповідних галузях науки, техніки, народного хозяйствФілологі бувають різних напрямків: практики та теоретики. Практики займаються постійним вивченням мов, роблять переклади, розширюють структурні мовні рамки. На відміну від практиків, теоретики займаються вивченням древніх і мертвих мов. Крім цього, теоретики розробляють нові правила, вводять нові умовні позначення, очищають мову від слів-паразитів і створюють словники.',
            image: require('../../../assets/proffessions/fillolog.jpg')
          },
        ]
    },
    {
        id: 'Ukr_123454321e1',
        item: 'Українська мова',
        itemEng: 'Ukrainian language',
        grades: [],
        gradesSum: 0,
        color: '#ffc93c',
        type: 'humanitarian',
        Abbreviation: 'Укр м',
        AbbreviationEng: 'Ua',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Диктор',
            nameEng: 'Speaker',
            descriptionEng: 'An announcer on radio and television reviews the news feed, highlights the main thing, edits the news, and prioritizes them. Expressively reads the texts of programs (in and behind the scenes), going on air or in the recording. Reading out the news or commenting on events, the announcer emphasizes the most important information, using his voice to correctly place accents. He can act as a presenter of some programs, interview guests of the studio, independently develop and conduct programs, take part in the creation of a script, commercials and announcements where voice-over skills are required. In addition, specialists provide voice overs for foreign programs and films. The profession is associated with public speaking. For a successful announcer, just a pleasant voice is not enough. Competent presentation of information, artistic taste, emotionality - all these characteristics are necessary for a specialist. The announcer should know the basics of acting and journalistic skills, master the technique of speech perfectly, have deep knowledge in the field of stylistics of the Russian (Belarusian) language. Professionally important qualities are good diction, developed logical thinking, good memory, erudition, sociability, relaxedness, stress resistance, quick reaction, resourcefulness.',
            description: 'Диктор на радіо і телебаченні здійснює огляд стрічки новин, виділяє головне, редагує новини, розставляє їх в пріоритетному порядку. Виразно читає тексти передач (в кадрі і за кадром), що йдуть в безпосередньому ефірі або в записі. Зачитуючи новини або коментуючи події, диктор підкреслює найбільш важливу інформацію, за допомогою голосу правильно розставляє акценти. Може виступати провідним деяких передач, брати інтервю у гостей студії, самостійно розробляти і вести передачі, брати участь у створенні сценарію, рекламних роликів та оголошень, де необхідні дикторський навички. Крім цього, фахівці озвучують закордонні програми і фільми.Профессія повязана з публічними виступами. Для успішного диктора тільки приємного голосу недостатньо. Грамотна подача інформації, художній смак, емоційність - все ці характеристики необхідні для фахівця. Диктор повинен знати основи акторської і журналістської майстерності, досконало володіти технікою мови, мати глибокі знання в області стилістики російської (білоруського) мови. Професійно важливими якостями є хороша дикція, розвинене логічне мислення, хороша память, ерудованість, комунікабельність, розкутість, стресостійкість, швидкість реакції, винахідливість.',
            image: require('../../../assets/proffessions/dictor.jpeg')
          },
          {
            name: 'Журналіст',
            nameEng: 'Journalist',
            descriptionEng: 'A journalist is a specialist who works in the mass media system and is engaged in journalistic activities. The duties of a journalist are to promptly collect, process, correctly and easily present relevant information. Within journalism specializations can be distinguished by type of activity, genre specialization: for example, a reporter, publicist, columnist, commentator, essayist, TV and radio host, etc. ... Journalists also include editors working for publishing houses, radio, television and Internet portals. All of them are participants in the information process. In addition, journalists usually specialize in a certain topic, and this division is called profiling: a journalist writing on political, economic, sports topics, specializing in the field of culture, family, criminal chronicle, social life, etc. ... Each of these types and types of journalists has its own specific features, characterized by a stable system of knowledge, skills, labor operations.',
            description: 'Журналіст - це фахівець, який працює в системі засобів масової інформаціїї займається публіцистичною діяльністю. Обовязки журналіста - оперативно зібрати, обробити, грамотно і доступно викласти актуальну інформацію.В рамках журналістських спеціальностей можна виділити спеціалізації за видами діяльності, жанрової спеціалізації: наприклад, репортер, публіцист, оглядач, коментатор, нарисовець, провідний теле- і радіопередачі тощо . До числа журналістів відносяться також редактори, які працюють у видавництвах, на радіо, телебаченні та інтернет-порталах. Всі вони - учасники інформаційного процесса.Кроме того, журналісти зазвичай спеціалізуються в певній тематиці, і такий розподіл називається профілюванням: журналіст, що пише на політичні, економічні, спортивні теми, що спеціалізується в галузі культури, сімї, кримінальної хроніки, світського життя і т.д . Кожен з цих типів і видів журналістів має свої специфічні риси, характеризується стійкою системою знань, навичок, трудових операцій.',
            image: require('../../../assets/proffessions/journalist.jpg')
          },
          {
            name: 'Філолог',
            nameEng: 'Philologist',
            descriptionEng: 'A philologist is, first of all, a person who learns a language. A language is a universal communication tool, perhaps the most amazing mechanism ever mastered by mankind. A philologist, first of all, is a person who learns a language. Language is a universal communication tool, perhaps the most amazing mechanism. ever mastered by humanity. The philologist comprehensively studies the functions and internal structure of language, its nature, historical development and classification. He is engaged in research activities, works on the creation of scientific papers, reviews, is engaged in the restoration and study of texts, conducts research on the study of connections between ancient languages ​​and modern language groups, the origin and evolution of words, grammatical and linguistic forms, conducts work on the unification of terms, improvement of concepts and definitions in the relevant branches of science, technology, national economy Philologists are of different directions: practitioners and theorists. Practitioners are constantly studying languages, making translations, expanding the structural framework of language. Unlike practitioners, theorists are engaged in the study of ancient and dead languages. In addition, theorists develop new rules, introduce new conventions, cleanse the language of parasitic words, and create dictionaries.',
            description: 'Філолог, перш за все, це людина, що вивчає язик.Язик - універсальний інструмент комунікації, мабуть, найдивовижніший механізмосвоенний коли-небудь человечеством.Філолог, перш за все, це людина, що вивчає язик.Язик - універсальний інструмент комунікації, мабуть, найдивовижніший механізм, освоєний коли-небудь человечеством.Філолог всебічно вивчає функції і внутрішню структуру мови, його природу, історичний розвиток та класифікацію. Він займається науково-дослідницькою діяльністю, працює над створенням наукових праць, рецензій, займається відновленням і вивченням текстів, проводить дослідження з вивчення звязків між древніми мовами і сучасними групами мов, походженню й еволюції слів, граматичних і мовних форм, проводить роботи по уніфікації термінів, вдосконалення понять і визначень по відповідних галузях науки, техніки, народного хозяйствФілологі бувають різних напрямків: практики та теоретики. Практики займаються постійним вивченням мов, роблять переклади, розширюють структурні мовні рамки. На відміну від практиків, теоретики займаються вивченням древніх і мертвих мов. Крім цього, теоретики розробляють нові правила, вводять нові умовні позначення, очищають мову від слів-паразитів і створюють словники.',
            image: require('../../../assets/proffessions/fillolog.jpg')
          },
        ]
    },
    {
        id: 'History_123454321e1',
        item: 'Історія',
        itemEng: 'History',
        grades: [],
        gradesSum: 0,
        color: '#d59bf6',
        type: 'humanitarian',
        Abbreviation: 'Істор',
        AbbreviationEng: 'Hist',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Викладач історії',
            nameEng: 'History teacher',
            descriptionEng: 'A modern history teacher is a specialist who understands the role of the academic subjects of history and social studies in the development of a students individuality, realizing the value of historical experience for knowing the present and predicting the future. The task of a history teacher is to teach schoolchildren to understand history, historical processes that are happening and have taken place in our country and the world. The teacher not only conveys information to students, but also instills cultural and moral values, contributes to the formation of a persons worldview. The profession requires a high level of communication and organizational skills, good memory, logical thinking, flexibility and independence of thought, a high level of concentration. For the profession, such qualities as emotional and volitional stability, observation, attentiveness, erudition, broad outlook, curiosity, interest in historical events and phenomena are important. The teacher must be patient, creative, communicative and creative.',
            description: 'Сучасний викладач історії - це фахівець, який розуміє роль навчальних предметів історії та суспільствознавства в розвитку індивідуальності учня, який усвідомлює цінності історичного досвіду для пізнання сьогодення і прогнозування майбутнього. Завдання вчителя історії - навчити школярів розуміти історію, історичні процеси, які відбуваються і відбувалися в нашій країні і світі. Педагог не просто доносить інформацію до учнів, а й прищеплює культурні і моральні цінності, сприяє формуванню світогляду лічності.Профессія вимагає високого рівня комунікативних і організаторських здібностей, доброї памяті, логічного мислення, гнучкості та самостійності мислення, високого рівня концентрації уваги. Для професії важливі такі якості, як емоційно-вольова стійкість, спостережливість, уважність, ерудованість, широкий кругозір, допитливість, інтерес до історичних подій і явищ. Викладач повинен бути терплячим, творчим, комунікабельним і креативним.',
            image: require('../../../assets/proffessions/teacher.jpeg')
          },
          {
            name: 'Історик',
            nameEng: 'Historian',
            descriptionEng: 'The historian studies the past of mankind in all its diversity, using knowledge about all kinds of historical facts and processes, recreates a picture of the life of the state, peoples and individuals at different times. Establishes patterns of development of society and identifies cause-and-effect relationships between events that have occurred. Conducts research in various fields of historical science, theoretical or applied disciplines, collects and analyzes facts, events, processes based on historical sources, archival data, and eliminates inaccurate data.',
            description: 'Історик вивчає минуле людства у всьому його різноманітті, використовуючи знання про всілякі історичні факти і процеси, відтворює картину життя держави, народів і окремих людей в різні часи. Встановлює закономірності розвитку суспільства і виявляє причинно-наслідкові звязки між подіями. Проводить дослідження в різних областях історичної науки, теоретичних або прикладних її дисциплінах, займається збором і аналізом фактів, подій, процесів на основі історичних джерел, архівних даних, усуненням недостовірних даних.',
            image: require('../../../assets/proffessions/historig.jpg')
          },
          {
            name: 'Політолог',
            nameEng: 'Political scientist',
            descriptionEng: 'The political scientist assesses the aspects of the development of the political process in a historical context, takes into account traditions, modern trends and political culture. He examines the current political environment and at the same time compares it with similar phenomena in world history. Such a comparison helps him to trace the connection between political events and other spheres of life. A specialist can give an effective assessment of the phenomenon that is being investigated, as well as make a forecast of the development of political processes. The main task of a political scientist is to predict the consequences of future political events on the basis of existing knowledge, political ideas and traditions of past years, his own experience and the experience of other states.',
            description: 'Політолог оцінює аспекти розвитку політичного процесу в історичному контексті, враховує традиції, сучасні тенденції та політичну культуру. Він досліджує сучасну політичну \ обстановку і одночасно порівнює її зі схожими явищами світової історії. Таке порівняння допомагає йому простежити звязок політичних подій з іншими сферами життя. Спеціаліст може дати ефективну оцінку явищу, яке досліджується, а також зробити прогноз розвитку політичних процессов.Главная завдання політолога - передбачити наслідки майбутніх політичних подій на основі наявних знань, політичних ідей і традицій минулих років, власного досвіду і досвіду інших держав.',
            image: require('../../../assets/proffessions/historig.jpg')
          },
          {
            name: 'Археолог',
            nameEng: 'Archaeologist',
            descriptionEng: 'An archaeologist is a scientist who studies the life and culture of ancient people using various artifacts. An artifact in archeology is a human-made or processed object. Artifacts are also called material sources. These include buildings, tools, household items, jewelry, weapons, and other evidence of human activity. If there are letters on the artifacts, they are referred to as written sources. Material sources (as opposed to written ones) are silent. They do not contain references to historical events, and many were created long before the advent of writing. The task of an archaeologist is to create a picture of the past from the fragments found, relying on existing knowledge and finds, taking into account the location of the finds. They cannot be considered out of context, i.e. in isolation of the place, setting, depth of occurrence, objects found in the neighborhood, etc. The archaeologist searches for evidence of the past, and then examines them in the laboratory, classifies, restores, etc.',
            description: 'Археолог - це вчений, який вивчає побут і культуру древніх людей з різних артефактів. Артефакт в археології - це створений або оброблений людиною предмет. Артефакти також називають речовими джерелами. До них відносяться будівлі, знаряддя праці, домашнє начиння, прикраси, зброю та інші свідчення людської діяльності. Якщо ж на артефактах є письмена, вони іменуються письмовими джерелами. Речові джерела (на відміну від письмових) мовчазні. Вони не містять згадок про історичні події, а багато були створені задовго до появи писемності. Завдання археолога - створити картину минулого зі знайдених фрагментів, спираючись на вже наявні знання і знахідки, з урахуванням розташування знахідок. Їх неможливо розглядати поза контекстом, тобто у відриві місця, обстановки, глибини залягання, предметів, знайдених по сусідству і пр.Археолог відшукує свідоцтва минулого, а потім досліджує їх в лабораторії, класифікує, реставрують і т.д.',
            image: require('../../../assets/proffessions/argheolog.jpg')
          }
        ]
    },
    {
        id: 'Physic_123454321e1',
        item: 'Фізика',
        itemEng: 'Physic',
        grades: [],
        gradesSum: 0,
        color: '#1fab89',
        type: 'exact',
        Abbreviation: 'Фіз',
        AbbreviationEng: 'Phys',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Фізик',
            nameEng: 'Physicist',
            descriptionEng: 'Physicists who not only teach at universities, but are actively involved in current scientific research, usually earn good money. Some put forward theories and find new laws explaining phenomena in nature, others specialize in practical applications of physical laws and phenomena',
            description: 'Фізики, які не тільки викладають в університетах, а активно залучені в актуальні наукові дослідження, зазвичай непогано заробляють. Одні висувають теорії і находятновие закони, що пояснюють явища в природі, інші спеціалізуються на практичних додатках фізичних законів і явищ',
            image: require('../../../assets/proffessions/physic.jpg'),
          },
          {
            name: 'Інженер з ядерної техніки',
            nameEng: 'Nuclear engineer',
            descriptionEng: 'The application of scientific and technical data related to nuclear physics to the problems of nuclear energy production and the efficient disposal of radioactive waste are the main tasks of the nuclear engineer.',
            description: 'Додаток наукових і технічних даних, повязаних з ядерною фізикою, до проблем видобутку ядерної енергії та ефективного усунення радіоактивних відходів - ось основне коло завдань інженера-ядерника.',
            image: require('../../../assets/proffessions/physicNuclear.jpg'),
          },
          {
            name: 'Астроном',
            nameEng: 'Astronomer',
            descriptionEng: 'Children who like to count the stars in the sky can turn out to be real astronomers. This area of science studies phenomena in space and expands the knowledge of mankind about the Universe. The knowledge gained can help improve our life on Earth.',
            description: 'З дітей, які люблять вважати на небі зірки, можуть вийти справжні астрономи. Ця галузь науки вивчає явища в космосі і розширює пізнання людства про Всесвіт. Отримані знання можуть допомогти поліпшити і наше життя на Землі.',
            image: require('../../../assets/proffessions/astronom.jpg'),
          },
        ]
    },
    {
        id: 'Chemistry_123454321e1',
        item: 'Хімія',
        itemEng: 'Chemistry',
        grades: [],
        gradesSum: 0,
        color: '#e6a4b4',
        type: 'exact',
        Abbreviation: 'Хім',
        AbbreviationEng: 'Chemy',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name:'Біохімік',
            nameEng: 'Biochemist',
            descriptionEng: 'Biochemistry is at the junction of two sciences - biology and chemistry. This is a young science that appeared in the 19th century. A biochemist studies the composition and properties of living organisms - plants, animals, microorganisms and humans and their cells; the processes that occur in them; the laws of their life. Research carried out by biochemists makes it possible to study the mechanisms of the onset of diseases and develop methods of combating them, create new effective drugs or develop new varieties of plants. This is painstaking work that requires extensive knowledge, high concentration, endless patience.',
            description: 'Біохімія знаходиться на стику двох наук - біології та хімії. Це молода наука, що зявилася в 19 веке.Біохімік вивчає склад і властивості живих організмів - рослин, тварин, мікроорганізмів і людини і їх клітин; процеси, які в них відбуваються; закони їх жізнедеятельності.Ісследованія, проведені биохимиками, дозволяють вивчити механізми виникнення захворювань і розробити методи боротьби з ними, створити нові ефективні лікарські препарати або вивести нові сорти рослин. Це кропітка праця, яка вимагає великих знань, високої концентрації, нескінченного терпіння.',
            image: require('../../../assets/proffessions/biohimik.jpg'),
          },
          {
            name:'Лікар',
            nameEng: 'Doctor',
            descriptionEng: 'For a doctor, knowledge of biology and chemistry is a must. Medical professions are in high demand all over the world and at all times. Unfortunately, people get sick and the demand for doctors is not decreasing. The doctor also deals with issues of disease prevention.',
            description: 'Для лікаря знання біології і хімії обязательно.Медіцінскіе професії високо затребувані у всьому світі і в усі часи. На жаль, люди хворіють, і попит на лікарів не знижується. Лікар також займається питаннями профілактики захворювань.',
            image: require('../../../assets/proffessions/doctor.jpeg'),
          },
          {
            name:'Фармацевт',
            nameEng: 'Pharmacist',
            descriptionEng: 'The pharmaceutical specialist knows all about pharmaceuticals. He is also obliged to know the rules for providing first aid, the basics of pharmaceutical business, economics. The place of work of a pharmacist is research institutes, research centers, laboratories, as well as pharmacies.',
            description: 'Спеціаліст в області фармацевтики знає все про лікарські препарати. Також він зобовязаний знати правила надання долікарської допомоги, основ фармацевтичної справи, економікі.Место роботи фармацевта - НДІ, дослідницькі центри, лабораторії, а також аптеки.',
            image: require('../../../assets/proffessions/farmacept.jpeg'),
          },
        ]
    },
    {
        id: 'Geo_123454321e1',
        item: 'Географія',
        itemEng: 'Geography',
        grades: [],
        gradesSum: 0,
        color: '#590d82',
        type: 'humanitarian',
        Abbreviation: 'Гео',
        AbbreviationEng: 'Geo',
        teacher: 'Не указано',
        custom: false,
        relatedProffesions: [
          {
            name: 'Геодезист',
            nameEng: 'Surveyor',
            descriptionEng: 'A surveyor is a specialist in the field of space metrics, its measurement and data recording. The task of the surveyor is to calculate the area allocated for construction. Accuracy of analysis and meticulousness in detail are two basic principles of a good surveyors work. The construction of any object begins with a geodetic measurement of the territory, and from this point of view, it is the surveyor who becomes responsible for the quality and safety of the future construction.',
            description: 'Геодезист - фахівець в області метрики простору, його вимірювання і фіксування даних. До завдань геодезиста входить проведення розрахунків площ, відведених під будівництво. Точність аналізу і скрупульозність у деталях - два основних принципи якісної роботи геодезиста. Будівництво будь-якого обєкта починається з геодезичного вимірювання території, і з цієї точки зору саме геодезист стає відповідальним за якість і безпеку майбутньої споруди.',
            image: require('../../../assets/proffessions/geodezists.jpg'),
          },
          {
            name:'Картограф',
            nameEng: 'Cartographer',
            descriptionEng: 'A cartographer is a specialist in the preparation of paper and electronic maps. On the basis of survey materials, measurement, graphic, photographic, digital and text data, the cartographer makes maps for various purposes and scales. He specializes in the creation of geological, geographical, zoological, climatological, historical, ethnographic, economic, historical, military and other maps. In his work, the cartographer uses cartograms, schematic maps, cartographic projections. Draws up maps for specific institutions. Before starting to create a particular map, the cartographer needs to delve into the specifics of the customers business. We have to combine office work with business trips to the area. The main tools of the cartographer in this case are the level (for determining the height) and the theodolite (for measuring distances).',
            description: 'Картограф - фахівець зі складання паперових і електронних карт. На основі знімальних матеріалів, обмірних, графічних, фотографічних, цифрових і текстових даних картограф становить карти різного призначення і масштабу. Спеціалізується на створенні геологічних, географічних, зоологічних, кліматологічних, історичних, етнографічних, економічних, історичних, військових та інших карт. У своїй роботі картограф застосовує картограми, картосхеми, картографічні проекції. Складає карти на замовлення конкретних установ. Перед тим, як приступити до створення тієї чи іншої карти, картографові потрібно вникнути в специфіку діяльності підприємства-замовника. Доводиться поєднувати кабінетну роботу з відрядженнями на місцевість. Головні інструменти картографа при цьому - нівелір (для визначення висоти) і теодоліт (для вимірювання відстаней).',
            image: require('../../../assets/proffessions/mapper.jpg'),
          },
          {
            name: 'Менеджер по туризму',
            nameEng: 'Tourism manager',
            descriptionEng: 'A tourism manager is a specialist in the tourism industry who is involved in organizing travel for clients. Nowadays one of the most in-demand careers in the leisure and entertainment industry, Tourism Manager makes our vacation and travel dreams come true. From the outside it seems that this is the most romantic and interesting profession. But these are different things - to have a rest on your own or to organize a comfortable stay competently, which depends on many people and circumstances.',
            description: 'Менеджер з туризму - це фахівець в галузі туризму, який займається організацією туристичних поїздок клієнтів. В даний час це одна з найбільш затребуваних професій віндустріі відпочинку і развлеченій.Менеджер по туризму втілює наші мрії про відпочинок і подорожі. З боку здається, що це найромантичніша і цікава професія. Але це різні речі - відпочивати самому або грамотно організувати комфортний відпочинок, який залежить від безлічі людей і обставин.',
            image: require('../../../assets/proffessions/menegerByTourism.jpg'),
          }
        ]
    },
    {
      id: 'Biology_123454321e1',
      item: 'Біологія',
      itemEng: 'Biology',
      grades: [],
      gradesSum: 0,
      color: '#590d82',
      type: 'exact',
      Abbreviation: 'Біо',
      AbbreviationEng: 'Bio',
      teacher: 'Не указано',
      custom: false,
      relatedProffesions: [
        {
          name: 'Вчений',
          nameEng: 'Scientist',
          descriptionEng: 'Research work in biology is very promising, and therefore talented scientists in this area are in demand. Of course, a lot depends on the specialty: for example, biophysics and zoology are completely different spheres, and the paths of professionals in both fields differ greatly. In addition, it should be borne in mind that, specifically in Russia, the work of scientists is encouraged mainly in words, but in deeds. the salaries of even the most qualified research institutes leave much to be desired.',
          description: 'Дослідницька робота в біології вельми перспективна, а тому і талановиті вчені в цій сфері затребувані. Звичайно, багато що залежить від спеціальності: наприклад, біофізика та зоологія - абсолютно різні сфери, і шляхи у професіоналів в тій і іншій області сильно расходятся.К того ж варто враховувати, що конкретно в Росії робота вчених заохочується в основному на словах, а на ділі зарплати навіть найбільш кваліфікованих співробітників НДІ залишають бажати кращого.',
          image: require('../../../assets/proffessions/biohimik.jpg'),
        },
        {
          name:'Лікар',
          nameEng: 'Doctor',
          descriptionEng: 'For a doctor, knowledge of biology and chemistry is a must. Medical professions are in high demand all over the world and at all times. Unfortunately, people get sick and the demand for doctors is not decreasing. The doctor also deals with issues of disease prevention.',
          description: 'Для лікаря знання біології і хімії обязательно.Медіцінскіе професії високо затребувані у всьому світі і в усі часи. На жаль, люди хворіють, і попит на лікарів не знижується. Лікар також займається питаннями профілактики захворювань.',
          image: require('../../../assets/proffessions/doctor.jpeg'),
        },
        {
          name: 'Ветеринар',
          nameEng: 'Vet',
          descriptionEng: 'A doctor who treats not people, but animals. Another specialty that is suitable for those who enjoy studying the science of living organisms. The veterinarian should have a good knowledge of zoology and disease specific to different species. Since private veterinary clinics are now being opened everywhere, a good specialist will definitely not be left without work.',
          description: 'Лікар, що лікує не людей, а тварин. Ще одна спеціальність, яка підійде тим, хто судовольствием вивчає науку про живих організмах. Ветеринар повинен добре знати зоологію і хвороби, характерні для представників різних біологічних видів. Оскільки приватні ветклініки сегодняоткриваются повсюдно, без роботи хороший фахівець точно не залишиться.',
          image: require('../../../assets/proffessions/veterinar.jpg')
        }
      ]
  },
]
export const subjectsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_STUDY_SUBJECT': {
          const newSubject = {
            id: new Date().getTime(),
            item: action.payload.subjectName,
            grades: [],
            gradesSum: 0,
            type: action.payload.subjectType,
            Abbreviation: action.payload.subjectAbrevation,
            teacher: action.payload.subjectTeacher, 
            relatedProffesions: [],
            custom: true
          }
          return [
            ...state,
            newSubject
          ]
        }
        case 'REMOVE_STUDY_SUBJECT':{
          return [
            ...state.filter(item => item.id !== action.payload)
          ]
        }
        case 'ADD_GRADE_TO_SUBJECT':{
          let changedSubject = {}
          state.forEach(item =>{
            if(item.item === action.payload.subject){
              changedSubject = item
            }
          })
          changedSubject.grades.push({
            id: new Date().getTime(),
            date: action.payload.date,
            grade: parseInt(action.payload.grade),
            randomIdForSubject: action.payload.randomIdForSubject
          })
          let sumOfGrades = 0 
          let average = 0
          changedSubject.grades.forEach(item => {
            sumOfGrades += item.grade
          })
          average = sumOfGrades/changedSubject.grades.length
          changedSubject.gradesSum = average
          const removedData = state.filter(item => item.item !== action.payload.subject)
          removedData.push(changedSubject)
          return [
            ...removedData
          ]
        }
        case 'REMOVE_GRADE_FROM_SUBJECT':{
          let changedSubject = {}
          state.forEach(item =>{
            if(item.item === action.payload.subject){
              changedSubject = item
            }
          })
          changedSubject.grades.forEach((item, index) => {
            if(item.randomIdForSubject === action.payload.randomIdForSubject){
              changedSubject.grades.splice(index, 1)
            }
          })
          let sumOfGrades = 0 
          let average = 0
          changedSubject.grades.forEach(item => {
            sumOfGrades += item.grade
          })
          if(sumOfGrades === 0){
            changedSubject.gradesSum = 0
          }
          else{
            average = sumOfGrades/changedSubject.grades.length
            changedSubject.gradesSum = average
          }
          const removedData = state.filter(item => item.item !== action.payload.subject)
          removedData.push(changedSubject)
          return [
            ...removedData
          ]
        }
        default:
          return state
    }
}