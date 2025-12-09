import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

const runSeeder = {
  seedProjects: true,
  seedTasks: true
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
)

/** SEED PROJECTS */
const seedProjects = async (numEntries) => {
  console.log(`Seeding ${numEntries} projects...`)

  const projects = []

  // Generate projects
  for (let i = 0; i < numEntries; i++) {
    const fakerStatus = faker.helpers.arrayElement([
      'not-started',
      'in-progress',
      'completed',
      'on-hold',
      'perpetual'
    ]);

    let dueDate = null;

    if (fakerStatus === 'completed')
      dueDate = faker.date.recent({ days: 90 })

    if (fakerStatus === 'in-progress' || fakerStatus === 'not-started')
      dueDate = faker.date.future({ years: 1 })

    if (fakerStatus === 'on-hold' || fakerStatus === 'perpetual')
      dueDate = null

    projects.push({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      status: fakerStatus,
      due_date: dueDate
    })
  }

  // Insert projects
  const { error } = await supabase.from('projects').insert(projects)

  if (error) {
    console.error('Error inserting projects:', error)
  }
  console.log('Projects seeding completed.')
}

if (runSeeder.seedProjects) await seedProjects(10)

/** SEED TASKS */
const seedTasks = async (numEntries) => {
  console.log(`Seeding ${numEntries} tasks...`)

  const { data: projects } = await supabase.from('projects').select('id')

  if (!projects || projects.length === 0) {
    console.error('No projects found to associate tasks with.')
    return
  }

  const tasks = []

  // Generate tasks
  for (let i = 0; i < numEntries; i++) {
    const fakerStatus = faker.helpers.arrayElement([
      'not-started',
      'in-progress',
      'completed',
      'on-hold',
      'repeating',
      'perpetual'
    ])

    let dueDate = null;

    if (fakerStatus === 'completed')
      dueDate = faker.date.recent({ days: 90 })

    if (fakerStatus === 'in-progress'
      || fakerStatus === 'not-started'
      || fakerStatus === 'repeating')
      dueDate = faker.date.future({ years: 1 })

    if (fakerStatus === 'on-hold' || fakerStatus === 'perpetual')
      dueDate = null

    tasks.push({
      project_id: faker.helpers.arrayElement(projects).id,
      name: faker.company.buzzPhrase().captalize(),
      description: faker.lorem.sentence(),
      status: fakerStatus,
      due_date: dueDate,
      repeating_type: fakerStatus === 'repeating'
        ? faker.helpers.arrayElement([
          'day',
          'week',
          'month',
          'quarter',
          'annual'
        ])
        : null,
      repeating_interval: fakerStatus === 'repeating'
        ? faker.number.int({ min: 1, max: 6 })
        : null
    })
  }

  // Insert tasks
  const { error } = await supabase.from('tasks').insert(tasks)

  if (error) {
    console.error('Error inserting tasks:', error)
  }
  console.log('Tasks seeding completed.')
}

if (runSeeder.seedTasks) await seedTasks(30)
