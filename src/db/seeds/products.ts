import { db } from '@/db';
import { products } from '@/db/schema';

async function main() {
    const sampleProducts = [
        {
            slug: 'workflow-automation-pro',
            name: 'WorkFlow Automation Pro',
            description: 'Complete workflow automation platform that streamlines your business processes with visual drag-and-drop builder. Connect apps, automate repetitive tasks, and boost team productivity. Perfect for marketing, sales, and operations teams looking to eliminate manual work and focus on strategic initiatives.',
            priceCents: 4900,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['Visual workflow builder', 'API integrations', 'Team collaboration', 'Advanced triggers', 'Performance analytics']),
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-10')
        },
        {
            slug: 'analytics-dashboard-suite',
            name: 'Analytics Dashboard Suite',
            description: 'Powerful business intelligence platform that transforms your data into actionable insights. Create stunning dashboards, generate automated reports, and make data-driven decisions with real-time analytics. Supports multiple data sources and offers advanced visualization tools for comprehensive business analysis.',
            priceCents: 9900,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['Real-time dashboards', 'Custom reports', 'Data visualization', 'Multi-source integration', 'Predictive analytics']),
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15')
        },
        {
            slug: 'helpdesk-support-center',
            name: 'HelpDesk Support Center',
            description: 'Modern customer support platform that helps you deliver exceptional service at scale. Manage tickets, track conversations, and provide multichannel support through email, chat, and social media. Features intelligent routing, knowledge base integration, and customer satisfaction tracking.',
            priceCents: 3900,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['Ticket management', 'Live chat support', 'Knowledge base', 'SLA tracking', 'Customer portal']),
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20')
        },
        {
            slug: 'api-integration-hub',
            name: 'API Integration Hub',
            description: 'Enterprise-grade integration platform that connects all your business applications seamlessly. Build, deploy, and manage APIs with advanced security, monitoring, and scaling capabilities. Perfect for businesses requiring complex data synchronization and system orchestration across multiple platforms.',
            priceCents: 19900,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['API gateway', 'Real-time sync', 'Security management', 'Monitoring tools', 'Developer portal']),
            createdAt: new Date('2024-01-25'),
            updatedAt: new Date('2024-01-25')
        },
        {
            slug: 'ai-assistant-chatbot',
            name: 'AI Assistant ChatBot',
            description: 'Intelligent conversational AI that enhances customer experience and automates support. Train your bot with custom knowledge, integrate with existing systems, and provide 24/7 assistance. Features natural language processing, sentiment analysis, and seamless human handoff capabilities.',
            priceCents: 7900,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['Natural language AI', 'Custom training', 'Multi-platform deployment', 'Analytics insights', 'Human handoff']),
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01')
        },
        {
            slug: 'developer-toolkit-suite',
            name: 'Developer Toolkit Suite',
            description: 'Comprehensive development environment designed for modern software teams. Includes code collaboration tools, CI/CD pipelines, testing frameworks, and deployment automation. Streamline your development workflow from idea to production with integrated project management and team communication features.',
            priceCents: 1900,
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: JSON.stringify(['Code collaboration', 'CI/CD pipelines', 'Testing automation', 'Project management', 'Team chat']),
            createdAt: new Date('2024-02-05'),
            updatedAt: new Date('2024-02-05')
        }
    ];

    await db.insert(products).values(sampleProducts);
    
    console.log('✅ Products seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});