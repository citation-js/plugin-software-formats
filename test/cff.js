export const inputTests = [
  {
    name: 'simple',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18`,
    output: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      title: 'My Research Tool',
      DOI: '10.5281/zenodo.1234',
      issued: { 'date-parts': [[2017, 12, 18]] },
      type: 'book',
      version: '1.0.4'
    }]
  },
  {
    name: 'Software with a DOI',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
    affiliation: "Humboldt-Universität zu Berlin, Dept. of German Studies and Linguistics"
    email: mail@sdruskat.net
    website: https://hu.berlin/sdruskat
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
repository-code: https://github.com/sdruskat/my-research-tool
repository-artifact: https://hu.berlin/nexus/mrt
keywords:
  - "McAuthor's algorithm"
  - linguistics
  - nlp
  - parser
  - deep convolutional neural network
license: Apache-2.0
url: https://sdruskat.github.io/my-research-tool`,
    output: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      DOI: '10.5281/zenodo.1234',
      issued: { 'date-parts': [[2017, 12, 18]] },
      keyword: 'McAuthor\'s algorithm,linguistics,nlp,parser,deep convolutional neural network',
      title: 'My Research Tool',
      type: 'book',
      URL: 'https://sdruskat.github.io/my-research-tool',
      version: '1.0.4'
    }]
  },
  {
    name: 'Source code without a DOI',
    input: `cff-version: 1.0.3
message: "If you use this MRT alpha snapshot version, please cite."
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool Prototype
version: 0.0.1-alpha1-build1507284872
date-released: 2017-12-18
repository-code: https://github.com/doe/mrt
commit: 160d54f9e935c914df38c1ffda752112b5c979a8`,
    output: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'My Research Tool Prototype',
      type: 'book',
      version: '0.0.1-alpha1-build1507284872'
    }]
  },
  {
    name: 'Closed-source software without a DOI',
    input: `cff-version: 1.0.3
message:
  If you dare use this commercial, closed-source, strangely versioned
  software in your research, please at least cite it as below.
authors:
  - family-names: Vader
    name-suffix: né Skywalker
    given-names: 'Anakin "Darth"'
title: Opaquity
version: opq-1234-XZVF-ACME-RLY
date-released: 2017-02-28
url: http://www.opaquity.com
contact:
  - name: Dark Side Software
    address: DS-1 Orbital Battle Station, near Scarif
    email: father@imperial-empire.com
    tel: +850 (0)123-45-666`,
    output: [{
      _cff_mainReference: true,
      author: [{ family: 'Vader', given: 'Anakin "Darth"', suffix: 'né Skywalker' }],
      issued: { 'date-parts': [[2017, 2, 28]] },
      title: 'Opaquity',
      type: 'book',
      URL: 'http://www.opaquity.com',
      version: 'opq-1234-XZVF-ACME-RLY'
    }]
  },
  {
    name: 'An executable',
    input: `cff-version: 1.0.3
message: "If you use MRT, please cite the following."
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool Kickstarter
version: 2.0.4
date-released: 2017-12-18
repository-artifact: https://hu.berlin/nexus/mrt-kickstarter/2.0.4/mrt2-kickstarter.exe`,
    output: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'My Research Tool Kickstarter',
      type: 'book',
      version: '2.0.4'
    }]
  },
  {
    name: 'A software container',
    input: `cff-version: 1.0.3
message: "If you use the MRT Docker container, please cite the following."
authors:
  - name: "Humboldt-Universität zu Berlin"
    website: https://www.linguistik.hu-berlin.de/
  - family-names: Doe
    given-names: Jane
title: mrt-iain-m-banks
version: 1.0.4 (Iain M. Banks)
url: https://github.com/doe/docker-brew-mrt/blob/160d54f9e935/iain/Dockerfile
repository: https://hub.docker.hu-berlin.de/_/mrt-iain-m-banks/
date-released: 2017-12-18`,
    output: [{
      _cff_mainReference: true,
      author: [
        { literal: 'Humboldt-Universität zu Berlin' },
        { family: 'Doe', given: 'Jane' }
      ],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'mrt-iain-m-banks',
      type: 'book',
      URL: 'https://github.com/doe/docker-brew-mrt/blob/160d54f9e935/iain/Dockerfile',
      version: '1.0.4 (Iain M. Banks)'
    }]
  },
  {
    name: 'Software with a further reference',
    input: `cff-version: 1.0.3
message: If you use My Research Tool, please cite both the software and the outline paper.
authors:
  - family-names: Doe
    given-names: Jane
  - family-names: Bielefeld
    name-particle: von
    given-names: Arthur
  - family-names: McAuthor
    given-names: Juniper
    name-suffix: Jr.
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: article
    scope: Cite this paper if you want to reference the general concepts of MRT.
    authors:
      - family-names: Doe
        given-names: Jane
      - family-names: Bielefeld
        name-particle: von
        given-names: Arthur
    title: "My Research Tool: A 100% accuracy syntax parser for all languages"
    year: 2099
    journal: Journal of Hard Science Fiction
    volume: 42
    issue: "13"
    doi: 10.9999/hardscifi-lang.42132`,
    output: [
      {
        _cff_mainReference: true,
        author: [
          { family: 'Doe', given: 'Jane' },
          { family: 'Bielefeld', given: 'Arthur', 'non-dropping-particle': 'von' },
          { family: 'McAuthor', given: 'Juniper', suffix: 'Jr.' },
        ],
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        title: 'My Research Tool',
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' },
          { family: 'Bielefeld', given: 'Arthur', 'non-dropping-particle': 'von' }
        ],
        'container-title': 'Journal of Hard Science Fiction',
        DOI: '10.9999/hardscifi-lang.42132',
        issue: '13',
        issued: { 'date-parts': [[2099]] },
        note: 'Cite this paper if you want to reference the general concepts of MRT.',
        title: 'My Research Tool: A 100% accuracy syntax parser for all languages',
        type: 'article-journal',
        volume: 42
      }
    ]
  },
  {
    name: 'art',
    input: `cff-version: 1.0.3
message: "If you use this software, please cite the following."
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: art
    authors:
      - family-names: Picasso
        given-names: Pablo
    title: Guernica
    year: 1937
    medium: Oil on canvas
    format: 349.3cm x 776.6cm
    location:
      name: Museo Reina Sofia
      city: Madrid
      country: ES`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        archive: 'Museo Reina Sofia',
        'archive-place': 'Madrid, ES',
        author: [{ family: 'Picasso', given: 'Pablo' }],
        dimensions: '349.3cm x 776.6cm',
        issued: { 'date-parts': [[1937]] },
        medium: 'Oil on canvas',
        title: 'Guernica',
        type: 'graphic'
      }
    ]
  },
  {
    name: 'article',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: article
    authors:
      - family-names: Smith
        given-names: Arfon M.
      - family-names: Katz
        given-names: Daniel S.
        affiliation: "National Center for Supercomputing Applications &
        Electrical and Computer Engineering Department & School of Information
        Sciences, University of Illinois at Urbana-Champaign, Urbana, Illinois,
        United States"
        orcid: https://orcid.org/0000-0001-5934-7525
      - family-names: Niemeyer
        given-names: Kyle E.
      - name: "FORCE11 Software Citation Working Group"
        website: https://www.force11.org/group/software-citation-working-group
    title: "Software citation principles"
    year: 2016
    journal: PeerJ Computer Science
    volume: 2
    issue: e86
    doi: 10.7717/peerj-cs.86
    url: https://doi.org/10.7717/peerj-cs.86`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Smith', given: 'Arfon M.' },
          { family: 'Katz', given: 'Daniel S.', _orcid: 'https://orcid.org/0000-0001-5934-7525' },
          { family: 'Niemeyer', given: 'Kyle E.' },
          { literal: 'FORCE11 Software Citation Working Group' },
        ],
        'container-title': 'PeerJ Computer Science',
        DOI: '10.7717/peerj-cs.86',
        issue: 'e86',
        issued: { 'date-parts': [[2016]] },
        title: 'Software citation principles',
        type: 'article-journal',
        URL: 'https://doi.org/10.7717/peerj-cs.86',
        volume: 2
      }
    ]
  },
  {
    name: 'blog',
    input: `cff-version: 1.0.3
message: If you use this software, please cite the software itself and the blog post.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: blog
    authors:
      - family-names: Doe
        given-names: Jane
    title: "Implement a 100% accuracy syntax parser for all languages? No probs!"
    date-published: 2017-09-23
    url: https://hu-berlin.de/blogs/jdoe/2017/09/23/if-only
    institution:
      name: "Humboldt-Universität zu Berlin"
      city: Berlin
      country: DE`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017, 9, 23]] },
        publisher: 'Humboldt-Universität zu Berlin',
        'publisher-place': 'Berlin, DE',
        title: 'Implement a 100% accuracy syntax parser for all languages? No probs!',
        type: 'post-weblog',
        'URL': 'https://hu-berlin.de/blogs/jdoe/2017/09/23/if-only'
      }
    ]
  },
  {
    name: 'book',
    input: `cff-version: 1.0.3
message: "If you use MRT for your research, please cite the following book."
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: book
    authors:
      - family-names: Doe
        given-names: Jane
    title: "The future of syntax parsing"
    year: 2017
    publisher:
      name: Far Out Publications
      city: Bielefeld
    medium: print`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017]] },
        medium: 'print',
        publisher: 'Far Out Publications',
        'publisher-place': 'Bielefeld',
        title: 'The future of syntax parsing',
        type: 'book'
      }
    ]
  },
  {
    name: 'conference-paper',
    input: `cff-version: 1.0.3
message: If you use this software, please cite the software and the paper.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: conference-paper
    authors:
      - family-names: Doe
        given-names: Jane
    title: "Ultimate-accuracy syntax parsing with My Research Tool"
    year: 2017
    collection-title: "Proceedings of the 1st Conference on Wishful Thinking"
    collection-doi: 10.5281/zenodo.123456
    editors:
      - family-names: Kirk
        given-names: James T.
    conference:
      name: 1st Conference on Wishful Thinking
      location: Spock's Inn Hotel and Bar
      address: 123 Main St
      city: Bielefeld
      region: Jarvis Island
      post-code: "12345"
      country: UM
      date-start: 2017-04-01
      date-end: 2017-04-01
    start: 42
    end: 45
    doi: 10.5281/zenodo.1234`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        'collection-title': 'Proceedings of the 1st Conference on Wishful Thinking',
        DOI: '10.5281/zenodo.1234',
        editor: [
          { family: 'Kirk', given: 'James T.' }
        ],
        event: '1st Conference on Wishful Thinking',
        'event-place': 'Spock\'s Inn Hotel and Bar',
        'event-date': { 'date-parts': [[2017, 4, 1], [2017, 4, 1]] },
        issued: { 'date-parts': [[2017]] },
        page: '42-45',
        'page-first': 42,
        title: 'Ultimate-accuracy syntax parsing with My Research Tool',
        type: 'paper-conference'
      }
    ]
  },
  {
    name: 'edited-work',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: edited-work
    authors:
      - family-names: Doe
        given-names: Jane
    title: "Ultimate-accuracy parsing in practice"
    year: 2017
    publisher:
      name: Far Out Publications
      city: Bielefeld
      country: DE`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017]] },
        publisher: 'Far Out Publications',
        'publisher-place': 'Bielefeld, DE',
        title: 'Ultimate-accuracy parsing in practice',
        type: 'book'
      }
    ]
  },
  {
    name: 'report',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: report
    authors:
      - name: Fictional Parsing Interest Group, ACME Inc.
    title: "100% accuracy syntax parsing at ACME"
    url: http://www.acme.com/sigs/fp/reports/hpsp.pdf
    year: 2017
    date-accessed: 2017-09-23`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { literal: 'Fictional Parsing Interest Group, ACME Inc.' }
        ],
        accessed: { 'date-parts': [[2017, 9, 23]] },
        issued: { 'date-parts': [[2017]] },
        title: '100% accuracy syntax parsing at ACME',
        type: 'report',
        URL: 'http://www.acme.com/sigs/fp/reports/hpsp.pdf'
      }
    ]
  },
  {
    name: 'thesis',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
references:
  - type: thesis
    authors:
      - family-names: Doe
        given-names: Jane
    title: "A high accuracy syntax parser in Visual Basic"
    thesis-type: PhD
    year: 2017
    department: Dept. of Universal Language Philosophy
    institution:
      name: "Humboldt-Universität zu Berlin"
      city: Berlin
      country: DE
    database: Thesiserver
    date-accessed: 2017-09-23
    date-published: 2017-03-21
    url: http://thesiserver.hu-berlin.de/2017/march/phd/doe-12345`,
    output: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        accessed: { 'date-parts': [[2017, 9, 23]] },
        issued: { 'date-parts': [[2017, 3, 21]] },
        genre: 'PhD',
        publisher: 'Dept. of Universal Language Philosophy, Humboldt-Universität zu Berlin',
        'publisher-place': 'Berlin, DE',
        source: 'Thesiserver',
        title: 'A high accuracy syntax parser in Visual Basic',
        type: 'thesis',
        URL: 'http://thesiserver.hu-berlin.de/2017/march/phd/doe-12345'
      }
    ]
  }
]

export const outputTests = [
  {
    name: 'simple',
    input: [{
      type: 'book',
      author: [{ family: 'Druskat', given: 'Stephan' }],
      title: 'My Research Tool',
      DOI: '10.5281/zenodo.1234',
      issued: { 'date-parts': [[2017, 12, 18]] },
      version: '1.0.4'
    }],
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
`
  },
  {
    name: 'Software with a DOI',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
  - type: url
    value: https://sdruskat.github.io/my-research-tool
keywords:
  - McAuthor's algorithm
  - linguistics
  - nlp
  - parser
  - deep convolutional neural network
title: My Research Tool
url: https://sdruskat.github.io/my-research-tool
version: 1.0.4
`,
    input: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      DOI: '10.5281/zenodo.1234',
      issued: { 'date-parts': [[2017, 12, 18]] },
      keyword: 'McAuthor\'s algorithm,linguistics,nlp,parser,deep convolutional neural network',
      title: 'My Research Tool',
      type: 'book',
      URL: 'https://sdruskat.github.io/my-research-tool',
      version: '1.0.4'
    }]
  },
  {
    name: 'Source code without a DOI',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
title: My Research Tool Prototype
version: 0.0.1-alpha1-build1507284872
`,
    input: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'My Research Tool Prototype',
      type: 'book',
      version: '0.0.1-alpha1-build1507284872'
    }]
  },
  {
    name: 'Closed-source software without a DOI',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Vader
    given-names: Anakin "Darth"
    name-suffix: né Skywalker
date-released: 2017-02-28T00:00:00.000Z
identifiers:
  - type: url
    value: http://www.opaquity.com
title: Opaquity
url: http://www.opaquity.com
version: opq-1234-XZVF-ACME-RLY
`,
    input: [{
      _cff_mainReference: true,
      author: [{ family: 'Vader', given: 'Anakin "Darth"', suffix: 'né Skywalker' }],
      issued: { 'date-parts': [[2017, 2, 28]] },
      title: 'Opaquity',
      type: 'book',
      URL: 'http://www.opaquity.com',
      version: 'opq-1234-XZVF-ACME-RLY'
    }]
  },
  {
    name: 'An executable',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
title: My Research Tool Kickstarter
version: 2.0.4
`,
    input: [{
      _cff_mainReference: true,
      author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'My Research Tool Kickstarter',
      type: 'book',
      version: '2.0.4'
    }]
  },
  {
    name: 'A software container',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - name: Humboldt-Universität zu Berlin
  - family-names: Doe
    given-names: Jane
date-released: 2017-12-18T00:00:00.000Z
identifiers:
  - type: url
    value: https://github.com/doe/docker-brew-mrt/blob/160d54f9e935/iain/Dockerfile
title: mrt-iain-m-banks
url: https://github.com/doe/docker-brew-mrt/blob/160d54f9e935/iain/Dockerfile
version: 1.0.4 (Iain M. Banks)
`,
    input: [{
      _cff_mainReference: true,
      author: [
        { literal: 'Humboldt-Universität zu Berlin' },
        { family: 'Doe', given: 'Jane' }
      ],
      issued: { 'date-parts': [[2017, 12, 18]] },
      title: 'mrt-iain-m-banks',
      type: 'book',
      URL: 'https://github.com/doe/docker-brew-mrt/blob/160d54f9e935/iain/Dockerfile',
      version: '1.0.4 (Iain M. Banks)'
    }]
  },
  {
    name: 'Software with a further reference',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Doe
    given-names: Jane
  - family-names: Bielefeld
    given-names: Arthur
    name-particle: von
  - family-names: McAuthor
    given-names: Juniper
    name-suffix: Jr.
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
      - family-names: Bielefeld
        given-names: Arthur
        name-particle: von
    doi: 10.9999/hardscifi-lang.42132
    identifiers:
      - type: doi
        value: 10.9999/hardscifi-lang.42132
    title: 'My Research Tool: A 100% accuracy syntax parser for all languages'
    date-published: 2099-01-01T00:00:00.000Z
    year: 2099
    issue: '13'
    journal: Journal of Hard Science Fiction
    notes: Cite this paper if you want to reference the general concepts of MRT.
    type: article
    volume: 42
`,
    input: [
      {
        _cff_mainReference: true,
        author: [
          { family: 'Doe', given: 'Jane' },
          { family: 'Bielefeld', given: 'Arthur', 'non-dropping-particle': 'von' },
          { family: 'McAuthor', given: 'Juniper', suffix: 'Jr.' },
        ],
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        title: 'My Research Tool',
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' },
          { family: 'Bielefeld', given: 'Arthur', 'non-dropping-particle': 'von' }
        ],
        'container-title': 'Journal of Hard Science Fiction',
        DOI: '10.9999/hardscifi-lang.42132',
        issue: '13',
        issued: { 'date-parts': [[2099]] },
        note: 'Cite this paper if you want to reference the general concepts of MRT.',
        title: 'My Research Tool: A 100% accuracy syntax parser for all languages',
        type: 'article-journal',
        volume: 42
      }
    ]
  },
  {
    name: 'art',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Picasso
        given-names: Pablo
    title: Guernica
    date-published: 1937-01-01T00:00:00.000Z
    year: 1937
    format: 349.3cm x 776.6cm
    medium: Oil on canvas
    location:
      name: Museo Reina Sofia
      country: ES
      city: Madrid
    type: art
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        archive: 'Museo Reina Sofia',
        'archive-place': 'Madrid, ES',
        author: [{ family: 'Picasso', given: 'Pablo' }],
        dimensions: '349.3cm x 776.6cm',
        issued: { 'date-parts': [[1937]] },
        medium: 'Oil on canvas',
        title: 'Guernica',
        type: 'graphic'
      }
    ]
  },
  {
    name: 'article',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Smith
        given-names: Arfon M.
      - family-names: Katz
        given-names: Daniel S.
        orcid: https://orcid.org/0000-0001-5934-7525
      - family-names: Niemeyer
        given-names: Kyle E.
      - name: FORCE11 Software Citation Working Group
    doi: 10.7717/peerj-cs.86
    identifiers:
      - type: doi
        value: 10.7717/peerj-cs.86
      - type: url
        value: https://doi.org/10.7717/peerj-cs.86
    title: Software citation principles
    url: https://doi.org/10.7717/peerj-cs.86
    date-published: 2016-01-01T00:00:00.000Z
    year: 2016
    issue: e86
    journal: PeerJ Computer Science
    type: article
    volume: 2
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Smith', given: 'Arfon M.' },
          { family: 'Katz', given: 'Daniel S.', _orcid: 'https://orcid.org/0000-0001-5934-7525' },
          { family: 'Niemeyer', given: 'Kyle E.' },
          { literal: 'FORCE11 Software Citation Working Group' },
        ],
        'container-title': 'PeerJ Computer Science',
        DOI: '10.7717/peerj-cs.86',
        issue: 'e86',
        issued: { 'date-parts': [[2016]] },
        title: 'Software citation principles',
        type: 'article-journal',
        URL: 'https://doi.org/10.7717/peerj-cs.86',
        volume: 2
      }
    ]
  },
  {
    name: 'blog',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
    identifiers:
      - type: url
        value: https://hu-berlin.de/blogs/jdoe/2017/09/23/if-only
    title: Implement a 100% accuracy syntax parser for all languages? No probs!
    url: https://hu-berlin.de/blogs/jdoe/2017/09/23/if-only
    date-published: 2017-09-23T00:00:00.000Z
    year: 2017
    month: 9
    publisher:
      name: Humboldt-Universität zu Berlin
      country: DE
      city: Berlin
    type: blog
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017, 9, 23]] },
        publisher: 'Humboldt-Universität zu Berlin',
        'publisher-place': 'Berlin, DE',
        title: 'Implement a 100% accuracy syntax parser for all languages? No probs!',
        type: 'post-weblog',
        'URL': 'https://hu-berlin.de/blogs/jdoe/2017/09/23/if-only'
      }
    ]
  },
  {
    name: 'book',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
    title: The future of syntax parsing
    date-published: 2017-01-01T00:00:00.000Z
    year: 2017
    medium: print
    publisher:
      name: Far Out Publications
      country: Bielefeld
    type: book
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017]] },
        medium: 'print',
        publisher: 'Far Out Publications',
        'publisher-place': 'Bielefeld',
        title: 'The future of syntax parsing',
        type: 'book'
      }
    ]
  },
  {
    name: 'conference-paper',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
    doi: 10.5281/zenodo.1234
    identifiers:
      - type: doi
        value: 10.5281/zenodo.1234
    title: Ultimate-accuracy syntax parsing with My Research Tool
    collection-title: Proceedings of the 1st Conference on Wishful Thinking
    conference:
      name: 1st Conference on Wishful Thinking
      location: Spock's Inn Hotel and Bar
      date-start: 2017-04-01T00:00:00.000Z
      date-end: 2017-04-01T00:00:00.000Z
    date-published: 2017-01-01T00:00:00.000Z
    year: 2017
    editors:
      - family-names: Kirk
        given-names: James T.
    start: '42'
    end: '45'
    type: conference-paper
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        'collection-title': 'Proceedings of the 1st Conference on Wishful Thinking',
        DOI: '10.5281/zenodo.1234',
        editor: [
          { family: 'Kirk', given: 'James T.' }
        ],
        event: '1st Conference on Wishful Thinking',
        'event-place': 'Spock\'s Inn Hotel and Bar',
        'event-date': { 'date-parts': [[2017, 4, 1], [2017, 4, 1]] },
        issued: { 'date-parts': [[2017]] },
        page: '42-45',
        'page-first': 42,
        title: 'Ultimate-accuracy syntax parsing with My Research Tool',
        type: 'paper-conference'
      }
    ]
  },
  {
    name: 'edited-work',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
    title: Ultimate-accuracy parsing in practice
    date-published: 2017-01-01T00:00:00.000Z
    year: 2017
    publisher:
      name: Far Out Publications
      country: DE
      city: Bielefeld
    type: book
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        issued: { 'date-parts': [[2017]] },
        publisher: 'Far Out Publications',
        'publisher-place': 'Bielefeld, DE',
        title: 'Ultimate-accuracy parsing in practice',
        type: 'book'
      }
    ]
  },
  {
    name: 'report',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - name: Fictional Parsing Interest Group, ACME Inc.
    identifiers:
      - type: url
        value: http://www.acme.com/sigs/fp/reports/hpsp.pdf
    title: 100% accuracy syntax parsing at ACME
    url: http://www.acme.com/sigs/fp/reports/hpsp.pdf
    date-accessed: 2017-09-23T00:00:00.000Z
    date-published: 2017-01-01T00:00:00.000Z
    year: 2017
    type: report
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { literal: 'Fictional Parsing Interest Group, ACME Inc.' }
        ],
        accessed: { 'date-parts': [[2017, 9, 23]] },
        issued: { 'date-parts': [[2017]] },
        title: '100% accuracy syntax parsing at ACME',
        type: 'report',
        URL: 'http://www.acme.com/sigs/fp/reports/hpsp.pdf'
      }
    ]
  },
  {
    name: 'thesis',
    output: `cff-version: 1.1.0
message: Please cite the following works when using this software.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
identifiers:
  - type: doi
    value: 10.5281/zenodo.1234
title: My Research Tool
version: 1.0.4
references:
  - authors:
      - family-names: Doe
        given-names: Jane
    identifiers:
      - type: url
        value: http://thesiserver.hu-berlin.de/2017/march/phd/doe-12345
    title: A high accuracy syntax parser in Visual Basic
    url: http://thesiserver.hu-berlin.de/2017/march/phd/doe-12345
    database: Thesiserver
    date-accessed: 2017-09-23T00:00:00.000Z
    date-published: 2017-03-21T00:00:00.000Z
    year: 2017
    month: 3
    thesis-type: PhD
    institution:
      name: Dept. of Universal Language Philosophy, Humboldt-Universität zu Berlin
      country: DE
      city: Berlin
    type: thesis
`,
    input: [
      {
        _cff_mainReference: true,
        author: [{ family: 'Druskat', given: 'Stephan', _orcid: 'https://orcid.org/0000-0003-4925-7248' }],
        title: 'My Research Tool',
        DOI: '10.5281/zenodo.1234',
        issued: { 'date-parts': [[2017, 12, 18]] },
        type: 'book',
        version: '1.0.4'
      },
      {
        author: [
          { family: 'Doe', given: 'Jane' }
        ],
        accessed: { 'date-parts': [[2017, 9, 23]] },
        issued: { 'date-parts': [[2017, 3, 21]] },
        genre: 'PhD',
        publisher: 'Dept. of Universal Language Philosophy, Humboldt-Universität zu Berlin',
        'publisher-place': 'Berlin, DE',
        source: 'Thesiserver',
        title: 'A high accuracy syntax parser in Visual Basic',
        type: 'thesis',
        URL: 'http://thesiserver.hu-berlin.de/2017/march/phd/doe-12345'
      }
    ]
  }
]
