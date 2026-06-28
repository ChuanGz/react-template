# Template philosophy

## Purpose

Provide a small, understandable React foundation that can generate selected
capabilities without leaving unused packages, configuration, source, or tests.

## Core and options

React, TypeScript, and Vite are the fixed core. Routing, API access, styling,
UI libraries, theme, authentication, authorization, layout, runtime safeguards,
and testing are capabilities selected through the option contract.

The generator must:

- produce a runnable project for every valid option combination;
- reject invalid combinations before writing files;
- omit every artifact owned exclusively by a disabled capability;
- prefer explicit generated code over hidden runtime abstraction;
- avoid prescribing dashboard, state-management, or domain architecture.

## Non-goals

The template is not a component framework, application generator for a specific
business domain, or compatibility layer for multiple build tools. Optional
capabilities may provide a baseline, but applications own their later design.

## Decision test

A proposed default belongs in the core only when nearly every generated React
application needs it and removing it would make the baseline unsafe or
non-runnable. Otherwise it must be optional or remain outside the template.
