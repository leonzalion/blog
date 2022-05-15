/**
	Guide the developer into setting up their environment for developing Precommit
*/

import inquirer from 'inquirer';
import InquirerPressToContinue from 'inquirer-press-to-continue';
import open from 'open';

inquirer.registerPrompt('press-to-continue', InquirerPressToContinue);

console.info(
	'Precommit requires Docker for running PostgreSQL and Redis containers locally.'
);

await open('https://docs.docker.com/get-docker/');

await inquirer.prompt({
	name: 'key',
	pressToContinueMessage:
		"Press any key to continue when you've finished installing Docker...",
	anyKey: true,
	type: 'press-to-continue',
});

console.info(
	'Precommit uses Kubernetes for deployments. To work with Kubernetes locally, please install minikube.'
);

await open('https://minikube.sigs.k8s.io/docs/start/');

await inquirer.prompt({
	name: 'key',
	pressToContinueMessage:
		"Press any key to continue when you've finished installing minikube...",
	anyKey: true,
	type: 'press-to-continue',
});
