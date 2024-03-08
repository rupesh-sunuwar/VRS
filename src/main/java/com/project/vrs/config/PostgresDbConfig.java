package com.project.vrs.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "secondEntityManagerFactoryBean",
        basePackages = {"com.project.vrs.postgres",},
        transactionManagerRef = "secondTransactionManager"
)
public class PostgresDbConfig {

    @Bean(name = "secondDataSource")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/vrs")
                .build();
    }

    // entityManagerFactory
    @Bean(name = "secondEntityManagerFactoryBean")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() {
        LocalContainerEntityManagerFactoryBean bean;
        bean = new LocalContainerEntityManagerFactoryBean();
        bean.setDataSource(dataSource());

        JpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        bean.setJpaVendorAdapter(adapter);

        Map<String, String> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");

        bean.setJpaPropertyMap(properties);
        bean.setPackagesToScan("com.project.vrs.postgres");

        return bean;
    }

    // platformTransactionManager
    @Bean(name = "secondTransactionManager")
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setEntityManagerFactory(entityManagerFactoryBean().getObject());
        return manager;
    }
}
