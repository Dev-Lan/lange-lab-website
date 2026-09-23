# Publication entry template

Copy the entry below into `publications.bib` and edit it. Everything marked
optional can be deleted outright — an empty field is not the same as no field.

See [README.md](README.md) for what each field means and how the file is
written.

```bibtex
@article{lastname2026shortname,
  title        = {Full Title of the Paper, Exactly as Published},
  author       = {Lastname, Firstname and Other, Someone A.},
  journal      = {Name of the Journal},
  year         = {2026},
  doi          = {10.1000/example},
  abstract     = {The abstract, as one paragraph. Shown on the publication's
                  page, and left out of the copied citation.},
  slug         = {2026-shortname},
  venuename    = {Name of the Journal (VENUE)},
  image        = {/images/publications/2026-shortname.png},
  award        = {Best Paper Award},
  link_pdf     = {https://example.com/paper.pdf},
  link_video   = {https://www.youtube.com/watch?v=EXAMPLE},
  link_website = {https://example.com/project/},
  link_code    = {https://github.com/example/repo}
}
```

Other entry types follow the same shape:

```bibtex
@inproceedings{lastname2026conference,
  title     = {A Conference or Workshop Paper},
  author    = {Lastname, Firstname},
  booktitle = {Proceedings of the Conference},
  year      = {2026},
  slug      = {2026-conference}
}

@misc{lastname2026preprint,
  title         = {A Preprint},
  author        = {Lastname, Firstname},
  year          = {2026},
  eprint        = {2601.00000},
  archiveprefix = {arXiv},
  primaryclass  = {cs.HC},
  howpublished  = {arXiv:2601.00000},
  venuename     = {arXiv preprint},
  slug          = {2026-preprint}
}

@phdthesis{lastname2026thesis,
  title     = {A Dissertation},
  author    = {Lastname, Firstname},
  school    = {University Name},
  year      = {2026},
  venuename = {PhD dissertation, University Name},
  slug      = {2026-thesis}
}
```
